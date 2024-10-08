import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Op } from "sequelize";
import { Area, Purpose, District, Type } from "../../../models/index";

const handler = nextConnect().get(async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;
  const page = req.query.page ? parseInt(req.query.page, 10) : null;
  const offset = (page - 1) * limit;

  const typeFilter = req.query.type ? req.query.type.split(",") : null;
  const purposeFilter = req.query.purposeOfAreas
    ? req.query.purposeOfAreas.split(",")
    : null;
  const districtFilter = req.query.districts
    ? req.query.districts.split(",")
    : null;

  const ratingFilter = req.query.rating ? Number(req.query.rating) : null;

  const params = {
    include: [],
    distinct: true,
    where: {},
    order: [],
  };

  if (page && limit) {
    params.limit = limit;
    params.offset = offset;
  }

  if (purposeFilter) {
    params.include.push({
      model: Purpose,
      where: { title: { [Op.in]: purposeFilter } },
    });
  } else {
    params.include.push({
      model: Purpose,
    });
  }

  if (districtFilter) {
    params.include.push({
      model: District,
      where: { name: { [Op.in]: districtFilter } },
    });
  } else {
    params.include.push({
      model: District,
    });
    params.order.push([District, "id", "ASC"]);
  }

  if (typeFilter) {
    params.include.push({
      model: Type,
      through: { attributes: [] },
      where: { name: { [Op.in]: typeFilter } },
    });
  } else {
    params.include.push({
      model: Type,
      through: { attributes: [] },
    });
  }

  if (ratingFilter) {
    params.where.rating = { [Op.eq]: ratingFilter };
  }

  try {
    const { count, rows: areas } = await Area.findAndCountAll(params);

    if (!areas) {
      return res.status(404).json({ error: "Area not found" });
    }

    return res.status(200).json({
      areas,
      totalItems: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while fetching the area",
      details: error.message,
    });
  }
});

export default withSentry(handler);
