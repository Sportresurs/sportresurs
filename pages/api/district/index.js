import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { District } from "../../../models/index";

const handler = nextConnect().get(async (req, res) => {
  const districts = await District.findAll({
    order: [["name", "ASC"]],
  });

  res.status(200).json({ districts });
});

export default withSentry(handler);
