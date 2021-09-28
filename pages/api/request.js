import nc from "next-connect";
import { withSentry } from "@sentry/nextjs";
import Request from "../../models/request";

const handler = nc()
  .post(async (req, res) => {
    try {
      const { date, status, admin, name, tel, info } = req.body;
      const newRequest = await Request.create({
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
    await Request.findAll()
      .then((requests) => {
        res.statusCode = 200;
        res.json(requests);
      })
      .catch((err) => {
        res.json(err);
      });
  });

export default withSentry(handler);
