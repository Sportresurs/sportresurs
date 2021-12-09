import { withSentry, captureException } from "@sentry/nextjs";
import nc from "next-connect";
import { Area, PurposeArea, Image } from "../../../models";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nc()
  .use(checkAuthAdmin)
  .delete(async (req, res) => {
    try {
      const { id } = req.query;
      await PurposeArea.destroy({ where: { area_id: id } });
      await Image.destroy({ where: { area_id: id } });
      await Area.destroy({ where: { id } });
      res.status(200).send("Area successfully deleted!");
    } catch (err) {
      res.status(500).json(err);
      captureException(err);
    }
  });

export default withSentry(handler);
