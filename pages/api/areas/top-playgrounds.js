import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Area } from "../../../models/index";

const handler = nextConnect().get(async (req, res) => {
  const areas = await Area.findAll({
    where: {
      featured: true,
    },
  });
  res.status(200).json({ areas });
});

export default withSentry(handler);
