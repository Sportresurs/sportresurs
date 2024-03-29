import axios from "axios";
import * as Sentry from "@sentry/nextjs";
import { BlockedNews } from "../models";

const FB_LONG_LIVED_ACCESS_TOKEN = process.env.FB_LONG_LIVED_ACCESS_TOKEN;
const FB_LKPSPORTRESURS_USER_ID = process.env.FB_LKPSPORTRESURS_USER_ID;
const FB_API_VERSION = process.env.FB_API_VERSION;
const LIMIT_FB_POSTS = process.env.LIMIT_FB_POSTS;
const LIMIT_FB_POSTS_FOR_FRONT = process.env.LIMIT_FB_POSTS_FOR_FRONT;

const MINUTES_15 = 900000;
const LAST_REQUEST = { news: [], time: 0 };
// const LONG_TOKEN_FB = { value: null, month: null };

const getBlockedIds = async () => {
  const blockedNews = await BlockedNews.findAll({
    attributes: ["instagram_id"],
  });
  return blockedNews.map(({ instagram_id: instagramId }) => instagramId);
};

const filterNews = async (news, blockedIds) =>
  news.filter(({ id }) => !blockedIds.includes(id));

const clearOldBlockedNews = (news, blockedIds) => {
  const newsIds = news.map(({ id }) => id);
  const oldBlocks = blockedIds.filter((id) => !newsIds.includes(id));
  if (oldBlocks.length === 0) {
    return undefined;
  }
  return BlockedNews.destroy({
    where: {
      instagram_id: oldBlocks,
    },
  });
};

/*
const getLongLivedToken = async () => {
  const monthNow = new Date().getMonth();
  if (LONG_TOKEN_FB.month === monthNow) {
    return;
  }
  const { data } = await axios.get(
    "https://graph.facebook.com/v12.0/oauth/access_token",
    {
      params: {
        grant_type: "fb_exchange_token",
        client_id: process.env.FB_CLIENT_ID,
        client_secret: process.env.FB_CLIENT_SECRET,
        fb_exchange_token: FB_ACCESS_TOKEN,
      },
    }
  );
  LONG_TOKEN_FB.month = monthNow;
  LONG_TOKEN_FB.value = data.access_token;
};
*/

const getPosts = async () => {
  const now = Date.now();
  if (
    LAST_REQUEST.news.length
    && LAST_REQUEST.time
    && (LAST_REQUEST.time + MINUTES_15 > now)) {
    return LAST_REQUEST.news;
  }
  try {
    // await getLongLivedToken();
    const {
      data: { data },
    } = await axios.get(
      `https://graph.facebook.com/${FB_API_VERSION}/${FB_LKPSPORTRESURS_USER_ID}/posts`,
      {
        params: {
          fields: "message,id,full_picture,permalink_url",
          limit: LIMIT_FB_POSTS,
          access_token: FB_LONG_LIVED_ACCESS_TOKEN,
        },
      }
    );
    const normalizedData = data
      .filter((post) => post.full_picture && post.message)
      .map((post) => ({
        id: post.id,
        imgUrl: post.full_picture,
        url: post.permalink_url,
        text: post.message,
      }));

    const blockedIds = await getBlockedIds();
    await clearOldBlockedNews(normalizedData, blockedIds);
    const filteredNews = (await filterNews(normalizedData, blockedIds)).slice(
      0,
      LIMIT_FB_POSTS_FOR_FRONT
    );
    LAST_REQUEST.news = filteredNews;
    LAST_REQUEST.time = now;

    return filteredNews;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    Sentry.captureException(err);
    return LAST_REQUEST.news;
  }
};

const clearNewsCache = () => {
  LAST_REQUEST.news = [];
  LAST_REQUEST.time = 0;
};

export { getPosts, clearNewsCache };
