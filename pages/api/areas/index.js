import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Area, Purpose } from "../../../models/index";

const handler = nextConnect().get(async (req, res) => {
  const areas = await Area.findAll({ include: Purpose });
  res.status(200).json({ areas });
});

export default withSentry(handler);
