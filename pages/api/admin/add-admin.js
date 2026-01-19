import { captureException, withSentry } from "@sentry/nextjs";
import nc from "next-connect";
import { User } from "../../../models";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";
import { sendInviteAdmin } from "../../../utils/emailSender";

const handler = nc()
  .use(checkAuthAdmin)
  .post(async (req, res) => {
    try {
      const { email } = req.body;
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        if (candidate.status === "deleted") {
          await User.update({ status: "pending" }, { where: { email } });
          sendInviteAdmin(email);
          return res.status(200).send("Admin reactivated!");
        }
        return res.status(409).send("This email is already in use!");
      }
      await User.create({ email, role: "admin", status: "pending" });
      sendInviteAdmin(email);
      return res.status(200).send("Admin added!");
    } catch (err) {
      captureException(err);
      return res.status(500).send({ error: err.name });
    }
  });

export default withSentry(handler);
