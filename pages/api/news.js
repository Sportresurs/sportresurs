import { withSentry, captureException } from "@sentry/nextjs";
import nc from "next-connect";
import getNewsFromInstagram from "../../utils/instagram";

const handler = nc().get(async (req, res) => {
  try {
    const data = await getNewsFromInstagram();
    res.status(200).json(data);
  } catch (err) {
    captureException(err);
  }
});

export default withSentry(handler);
