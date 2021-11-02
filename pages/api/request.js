import nc from "next-connect";
import { withSentry, captureException } from "@sentry/nextjs";
import { Request } from "../../models";
import { sendRequest } from "../../utils/emailSender";
import checkAuthAdmin from "../../middleware/checkAuthAdmin";

const handler = nc()
  .post(async (req, res) => {
    try {
      const { name, phone, details } = req.body;
      const newRequest = await Request.create({
        name,
        phone,
        details,
      });
      sendRequest(name, phone, details);
      res.status(201).json(newRequest);
    } catch (err) {
      res.json(err);
      captureException(err);
    }
  })
  .use(checkAuthAdmin)
  .get(async (req, res) => {
    try {
      const userRequests = await Request.findAll({});
      res.status(200).json({ userRequests });
    } catch (error) {
      res.json(error);
    }
  })
  .patch(async (req, res) => {
    try {
      const { id, status, email } = req.body;
      const request = await Request.findOne({ where: { id } });
      request.status = status;
      request.admin_email = email;
      await request.save();
      res.status(200).json({ request });
    } catch (error) {
      res.json(error);
    }
  });

export default withSentry(handler);
