import nc from "next-connect";
import { withSentry } from "@sentry/nextjs";
import { Image } from "../../../models";

const MONTH_IN_SECONDS = 2592000;

const handler = nc().get(async (req, res) => {
  const { image: imageIdString } = req.query;
  const image = await Image.findOne({
    where: {
      area_id: imageIdString,
    },
  });
  if (!image) {
    res.status(404).end();
    return;
  }
  res.writeHead(200, {
    "Content-Type": "image/jpg",
    "Cache-Control": `public, immutable, max-age=${MONTH_IN_SECONDS}`,
  });
  res.end(image.file);
});

export default withSentry(handler);
