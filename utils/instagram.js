import axios from "axios";

const LIMIT_POSTS = 15;
const INSTAGRAM_PAGE_ID = 46497980119;
const QUERY_HASH = "472f257a40c653c64c666ce877d59d2b";

const PARAMS = [
  `query_hash=${QUERY_HASH}`,
  `id=${INSTAGRAM_PAGE_ID}`,
  `first=${LIMIT_POSTS}`,
];

const COMBINED_PARAMS = PARAMS.join("&");

const INSTAGRAM_URL = `https://www.instagram.com/graphql/query/?${COMBINED_PARAMS}`;

const getNewsFromInstagram = async () => {
  const { data } = await axios.get(INSTAGRAM_URL);

  const newsFromInstagram =
    data.data.user.edge_owner_to_timeline_media.edges.map(({ node }) => {
      const {
        id,
        shortcode,
        edge_media_to_caption: { edges },
      } = node;

      const imgUrl = node.display_url;

      const { text } = edges[0].node;

      return {
        id,
        imgUrl,
        url: `https://www.instagram.com/p/${shortcode}/`,
        text,
      };
    });

  return newsFromInstagram;
};

export default getNewsFromInstagram;
