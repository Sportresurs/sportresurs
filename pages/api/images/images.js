import nc from "next-connect";
import { withSentry } from "@sentry/nextjs";
import { Image } from "../../../models";

const handler = nc().get(async (req, res) => {
  const { id } = req.query;

  const images = await Image.findAll({
    where: {
      area_id: Number(id),
    },
  });

  if (!images) {
    res.status(404).end();
    return;
  }

  res.json(images);
});

export default withSentry(handler);
