import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Area, Purpose } from "../../../models/index";

const handler = nextConnect().get(async (req, res) => {
  const areas = await Area.findAll({ include: Purpose });
  const districts = areas
    .map(({ district }) => district)
    .reduce((acc, item) => {
      if (acc.includes(item)) {
        return acc;
      }
      return [...acc, item];
    }, []);
  const allPurposes = areas
    .map(({ Purposes }) => {
      const arr = Purposes.map(({ title }) => title);
      return arr;
    })
    .flat();
  const purposes = allPurposes
    .reduce((acc, item) => {
      if (acc.includes(item)) {
        return acc;
      }
      return [...acc, item];
    }, [])
    .map((item) => `${item.slice(0, 1).toUpperCase()}${item.slice(1)}`);
  return res.status(200).json({ purposes, districts });
});

export default withSentry(handler);
