import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Area, Purpose, District, Type } from "../../../models/index";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nextConnect()
  .get(async (req, res) => {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Area ID is required" });
    }

    try {
      const area = await Area.findOne({
        where: { id },
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

      if (!area) {
        return res.status(404).json({ error: "Area not found" });
      }

      return res.status(200).json({ area });
    } catch (error) {
      return res.status(500).json({
        error: "An error occurred while fetching the area",
        details: error.message,
      });
    }
  })
  .use(checkAuthAdmin)
  .patch(async (req, res) => {
    const { id } = req.query;
    const updatedResult = await Area.update(
      {
        ...req.body,
      },
      { where: { id }, returning: true }
    );
    res.status(200).json({ area: updatedResult[1]?.[0] });
  });

export default withSentry(handler);
