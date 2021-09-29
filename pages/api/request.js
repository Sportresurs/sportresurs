import nc from "next-connect";
import { withSentry } from "@sentry/nextjs";
import { Request } from "../../models";

const handler = nc().post(async (req, res) => {
  try {
    const { name, phone, info } = req.body;
    const newRequest = await Request.create({
      name,
      phone,
      info,
    });
    res.statusCode = 201;
    res.json(newRequest);
  } catch (err) {
    res.json(err);
  }
});

export default withSentry(handler);
