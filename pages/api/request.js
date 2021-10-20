import nc from "next-connect";
import { withSentry, captureException } from "@sentry/nextjs";
import { Request } from "../../models";
import { sendRequest } from "../../utils/emailSender";

const handler = nc()
  .get(async (req, res) => {
    const userRequests = await Request.findAll();
    return res.status(200).json({ userRequests });
  })
  .post(async (req, res) => {
    try {
      const { name, phone, info } = req.body;
      const newRequest = await Request.create({
        name,
        phone,
        info,
      });
      sendRequest(name, phone, info);
      res.status(201).json(newRequest);
    } catch (err) {
      res.json(err);
      captureException(err);
    }
  })
  .patch(async (req, res) => {
    const { id, status, email } = req.body;
    const request = await Request.findOne({ where: { id } });
    if (!request) {
      return res
        .status(200)
        .send({ error: { message: "request ID doesn't exsist" } });
    }
    request.status = status;
    request.admin_email = email;

    await request.save();

    return res.status(200).json({ request });
  });

export default withSentry(handler);
