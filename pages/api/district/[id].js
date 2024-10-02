import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { District } from "../../../models/index";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nextConnect()
  .get(async (req, res) => {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "District ID is required" });
    }

    try {
      const district = await District.findOne({
        where: { id },
      });

      if (!district) {
        return res.status(404).json({ error: "District not found" });
      }

      return res.status(200).json({ district });
    } catch (error) {
      return res.status(500).json({
        error: "An error occurred while fetching the District",
        details: error.message,
      });
    }
  })
  .use(checkAuthAdmin)
  .put(async (req, res) => {
    const { id } = req.query;
    const updatedResult = await District.update(
      {
        ...req.body,
      },
      { where: { id }, returning: true }
    );
    res.status(200).json({ district: updatedResult[1]?.[0] });
  })
  .use(checkAuthAdmin)
  .delete(async (req, res) => {
    const { id } = req.query;

    const deleteRes = await District.destroy({
      where: { id },
    });

    res.status(200).json({ deleteRes });
  });

export default withSentry(handler);
