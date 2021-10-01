import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Op } from "sequelize";
import { Area, Purpose } from "../../models/index";

const handler = nextConnect()
  .get(async (req, res) => {
    const areas = await Area.findAll({ include: Purpose });
    res.status(200).json({ areas });
  })
  .post(async (req, res) => {
    const { purposes = [], districts = [], rating = 0 } = req.body;
    const areas = await Area.findAll({
      where: {
        district: {
          [Op.or]: districts,
        },
        rating: {
          [Op.gte]: rating,
        },
      },
      include: Purpose,
    });
    if (purposes.length === 0) {
      return res.status(200).json({ areas });
    }
    const filteredAreas = areas.filter(({ Purposes }) => {
      if (Purposes.length === 0) {
        return false;
      }
      const mapPurposes = Purposes.map((item) => item.dataValues.title);
      return purposes.every((value) => mapPurposes.includes(value));
    });
    return res.status(200).json({ areas: filteredAreas });
  });

export default withSentry(handler);
