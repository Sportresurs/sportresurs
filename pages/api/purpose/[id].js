import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Purpose } from "../../../models/index";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nextConnect()
  .get(async (req, res) => {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Purpose ID is required" });
    }

    try {
      const purpose = await Purpose.findOne({
        where: { id },
      });

      if (!purpose) {
        return res.status(404).json({ error: "Purpose not found" });
      }

      return res.status(200).json({ purpose });
    } catch (error) {
      return res.status(500).json({
        error: "An error occurred while fetching the Purpose",
        details: error.message,
      });
    }
  })
  .use(checkAuthAdmin)
  .put(async (req, res) => {
    const { id } = req.query;
    const updatedResult = await Purpose.update(
      {
        ...req.body,
      },
      { where: { id }, returning: true }
    );
    res.status(200).json({ purpose: updatedResult[1]?.[0] });
  })
  .use(checkAuthAdmin)
  .delete(async (req, res) => {
    const { id } = req.query;

    const deleteRes = await Purpose.destroy({
      where: { id },
    });

    res.status(200).json({ deleteRes });
  });

export default withSentry(handler);
