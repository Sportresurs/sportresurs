import axios from "axios";
import * as Sentry from "@sentry/nextjs";
import { BlockedNews } from "../models";

const LIMIT_POSTS = 30;
const INSTAGRAM_PAGE_ID = 46497980119;
const QUERY_HASH = "472f257a40c653c64c666ce877d59d2b";
const MINUTES_15 = 900000;

const PARAMS = [
  `query_hash=${QUERY_HASH}`,
  `id=${INSTAGRAM_PAGE_ID}`,
  `first=${LIMIT_POSTS}`,
];

const COMBINED_PARAMS = PARAMS.join("&");

const INSTAGRAM_URL = `https://www.instagram.com/graphql/query/?${COMBINED_PARAMS}`;

const lastReq = {
  news: [],
  time: 0,
};

const getBlockedIds = async () => {
  const blockedNews = await BlockedNews.findAll({
    attributes: ["instagram_id"],
  });
  return blockedNews.map(({ instagram_id: instagramId }) => instagramId);
};

const filterNews = async (news) => {
  const blockedIds = await getBlockedIds();
  return news.filter(({ id }) => !blockedIds.includes(id));
};

const clearOldBlockedNews = async (news) => {
  const blockedIds = await getBlockedIds();
  const newsIds = news.map(({ id }) => id);
  const oldBlocks = blockedIds.filter((id) => !newsIds.includes(id));
  if (oldBlocks.length > 0) {
    await BlockedNews.destroy({
      where: {
        instagram_id: oldBlocks,
      },
    });
  }
};

export const getNewsFromInstagram = async () => {
  const timeNow = Date.now();
  if (lastReq.time + MINUTES_15 > timeNow) {
    return lastReq.news;
  }

  try {
    const { data } = await axios.get(INSTAGRAM_URL);

    const newsFromInstagram =
      data.data.user.edge_owner_to_timeline_media.edges.map(({ node }) => {
        const {
          id,
          shortcode,
          edge_media_to_caption: { edges },
        } = node;

        return {
          id,
          imgUrl: node.display_url,
          url: `https://www.instagram.com/p/${shortcode}/`,
          text: edges[0].node.text,
        };
      });

    await clearOldBlockedNews(newsFromInstagram);
    const filteredNews = (await filterNews(newsFromInstagram)).slice(0, 15);
    lastReq.news = filteredNews;
    lastReq.time = timeNow;
    return filteredNews;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    Sentry.captureException(err);
    return lastReq.news;
  }
};

export const clearNewsCache = () => {
  lastReq.news = [];
  lastReq.time = 0;
};
