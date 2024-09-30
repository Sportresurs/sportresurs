import { Op, cast, where, col } from "sequelize";
import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Area, Purpose, District, Type } from "../../../models/index";

const handler = nextConnect().get(async (req, res) => {
  const { query } = req.query;

  const areas = await Area.findAll({
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

    where: {
      [Op.or]: [
        where(cast(col("Area.number"), "varchar"), {
          [Op.substring]: query || "",
        }),
      ],
    },
  });
  res.status(200).json({ areas });
});

export default withSentry(handler);
