import { withSentry, captureException } from "@sentry/nextjs";
import nc from "next-connect";
import { getPostsFromFB } from "../../utils/facebook";

const handler = nc().get(async (req, res) => {
  try {
    const data = await getPostsFromFB();
    res.status(200).json(data);
  } catch (err) {
    captureException(err);
  }
});

export default withSentry(handler);
