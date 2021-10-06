import { captureException, withSentry } from "@sentry/nextjs";
import nc from "next-connect";
import { User } from "../../../models";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nc()
  .use(checkAuthAdmin)
  .post(async (req, res) => {
    try {
      const { email } = req.body;
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return res.statusCode(409).send("This email is already in use!");
      }
      await User.create({ email, role: "admin", status: "pending" });
      const user = await User.findOne({ where: { email } });
      return res.statusCode(201).json(user);
    } catch (err) {
      captureException(err);
      return res.status(500).send({ error: err.name });
    }
  });

export default withSentry(handler);
