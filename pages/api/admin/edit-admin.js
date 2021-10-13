import { captureException, withSentry } from "@sentry/nextjs";
import nc from "next-connect";
import { User } from "../../../models";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nc()
  .use(checkAuthAdmin)
  .patch(async (req, res) => {
    try {
      const { email } = req.body;
      const candidate = await User.findOne({ where: { email } });
      if (!candidate) {
        return res.status(409).send("This email does not exist!");
      }
      await User.update({ email });
      return res.status(200).send("Admin successfully updated!");
    } catch (err) {
      captureException(err);
      return res.status(500).send({ error: err.name });
    }
  });

export default withSentry(handler);
