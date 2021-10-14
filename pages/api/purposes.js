import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Purpose } from "../../models";

const handler = nextConnect().get(async (req, res) => {
  const purpose = await Purpose.findAll();
  res.status(200).json({ purpose });
});

export default withSentry(handler);
