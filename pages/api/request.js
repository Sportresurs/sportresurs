import nc from "next-connect";
import { withSentry, captureException } from "@sentry/nextjs";
import { Request } from "../../models";
import { sendRequest } from "../../utils/emailSender";

const handler = nc().post(async (req, res) => {
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
});

export default withSentry(handler);
