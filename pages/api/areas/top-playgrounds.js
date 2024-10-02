import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Area, District, Purpose, Type } from "../../../models/index";

const handler = nextConnect().get(async (req, res) => {
  const areas = await Area.findAll({
    where: {
      featured: true,
    },
    include: [
      {
        model: Purpose,
      },
      {
        model: District,
      },
      {
        model: Type,
        through: { attributes: [] },
      },
    ],
  });
  res.status(200).json({ areas });
});

export default withSentry(handler);
