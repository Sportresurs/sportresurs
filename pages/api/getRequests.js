import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Request } from "../../models/index";

const handler = nextConnect()
  .get(async (req, res) => {
    const userRequests = await Request.findAll();
    return res.status(200).json({ userRequests });
  })
  .patch(async (req, res) => {
    const { id, status, email } = req.body;
    const request = await Request.findOne({ where: { id } });
    request.status = status;
    request.admin_email = email;

    await request.save();

    return res.status(200).json({ request });
  });

export default withSentry(handler);
