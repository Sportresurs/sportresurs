import nc from "next-connect";
import { withSentry } from "@sentry/nextjs";
import ContactRequest from "../../models/contactrequest";

const handler = nc()
  .post(async (req, res) => {
    try {
      const { date, status, admin, name, tel, info } = req.body;
      const newRequest = await ContactRequest.create({
        date,
        status,
        admin,
        name,
        tel,
        info,
      });
      res.statusCode = 201;
      res.json(newRequest);
    } catch (err) {
      res.json(err);
    }
  })
  .get(async (req, res) => {
    await ContactRequest.findAll()
      .then((requests) => {
        res.statusCode = 200;
        res.json(requests);
      })
      .catch((err) => {
        res.json(err);
      });
  });

export default withSentry(handler);
