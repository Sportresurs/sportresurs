import { Op, cast, where, col } from "sequelize";
import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Area, Purpose, District, Type } from "../../../models/index";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nextConnect()
  .get(async (req, res) => {
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
  })
  .use(checkAuthAdmin)
  .post(async (req, res) => {
    const { Types, Purposes, ...otherFields } = req.body;

    const newArea = await Area.create({
      ...otherFields,
    });

    const area = await Area.findByPk(newArea.id);

    if (Types && Types.length) {
      const typeIds = Types.map((el) => el.value);
      await area.setTypes(typeIds);
    }

    if (Purposes && Purposes.length) {
      const purposeIds = Purposes.map((el) => el.value);
      await area.setPurposes(purposeIds);
    }

    res.status(200).json({ newArea });
  });

export default withSentry(handler);
