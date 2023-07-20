import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Area } from "../../../models/index";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nextConnect()
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
