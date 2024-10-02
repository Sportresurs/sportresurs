import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Type } from "../../../models/index";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nextConnect()
  .get(async (req, res) => {
    const types = await Type.findAll({
      order: [["name", "ASC"]],
    });

    res.status(200).json({ types });
  })
  .use(checkAuthAdmin)
  .post(async (req, res) => {
    const createdType = await Type.create({
      ...req.body,
    });
    res.status(201).json(createdType);
  });

export default withSentry(handler);
