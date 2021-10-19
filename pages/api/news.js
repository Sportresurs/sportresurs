import { withSentry, captureException } from "@sentry/nextjs";
import nc from "next-connect";
import { getPosts } from "../../utils/facebook";

const handler = nc().get(async (req, res) => {
  try {
    const data = await getPosts();
    res.status(200).json(data);
  } catch (err) {
    captureException(err);
  }
});

export default withSentry(handler);
