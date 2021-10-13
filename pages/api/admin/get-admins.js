import { captureException, withSentry } from "@sentry/nextjs";
import nc from "next-connect";
import { User } from "../../../models";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nc()
  .use(checkAuthAdmin)
  .get(async (req, res) => {
    try {
      const admins = await User.findAll();
      return res.status(200).json(admins);
    } catch (err) {
      captureException(err);
      return res.status(500).send({ error: err.name });
    }
  });

export default withSentry(handler);
