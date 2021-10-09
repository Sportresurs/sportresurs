import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Area, Purpose } from "../../../models/index";

const handler = nextConnect().get(async (req, res) => {
  const areas = await Area.findAll({ include: Purpose });
  const districts = areas.map(({ district }) => district);
  const uniqDistricts = [...new Set(districts)];
  const purposes = areas.flatMap(({ Purposes }) =>
    Purposes.map(({ title }) => title)
  );
  const uniqPurposes = [...new Set(purposes)].map(
    (item) => `${item.slice(0, 1).toUpperCase()}${item.slice(1)}`
  );
  return res
    .status(200)
    .json({ purposes: uniqPurposes, districts: uniqDistricts });
});

export default withSentry(handler);
