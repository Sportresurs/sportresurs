import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Type } from "../../../models/index";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nextConnect()
  .get(async (req, res) => {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Type ID is required" });
    }

    try {
      const type = await Type.findOne({
        where: { id },
      });

      if (!Type) {
        return res.status(404).json({ error: "Type not found" });
      }

      return res.status(200).json({ type });
    } catch (error) {
      return res.status(500).json({
        error: "An error occurred while fetching the Type",
        details: error.message,
      });
    }
  })
  .use(checkAuthAdmin)
  .put(async (req, res) => {
    const { id } = req.query;
    const updatedResult = await Type.update(
      {
        ...req.body,
      },
      { where: { id }, returning: true }
    );
    res.status(200).json({ type: updatedResult[1]?.[0] });
  })
  .use(checkAuthAdmin)
  .delete(async (req, res) => {
    const { id } = req.query;

    const deleteRes = await Type.destroy({
      where: { id },
    });

    res.status(200).json({ deleteRes });
  });

export default withSentry(handler);
