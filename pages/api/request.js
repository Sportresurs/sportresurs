import nc from "next-connect";
import { withSentry, captureException } from "@sentry/nextjs";
import { Request } from "../../models";
import { sendRequest } from "../../utils/emailSender";

const handler = nc().post(async (req, res) => {
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
});

export default withSentry(handler);
