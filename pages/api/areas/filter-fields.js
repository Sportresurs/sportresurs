import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Area, Purpose } from "../../../models/index";

const handler = nextConnect().get(async (req, res) => {
  const areas = await Area.findAll({ include: Purpose });
  const isUnique = (value, index, self) => self.indexOf(value) === index;
  const districts = areas.map(({ district }) => district).filter(isUnique);
  const purposes = areas
    .flatMap(({ Purposes }) => Purposes.map(({ title }) => title))
    .filter(isUnique)
    .map((item) => `${item.slice(0, 1).toUpperCase()}${item.slice(1)}`);

  return res.status(200).json({ purposes, districts });
});

export default withSentry(handler);
