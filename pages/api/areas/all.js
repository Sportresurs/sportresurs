import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Area, Purpose, District, Type } from "../../../models/index";

const handler = nextConnect().get(async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const offset = (page - 1) * limit;
  const typeFilter = req.query.type;
  const params = {
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
    limit,
    offset,
    distinct: true,
  };

  if (typeFilter) {
    params.include[2].where = { name: typeFilter };
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
