import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { District } from "../../../models/index";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nextConnect()
  .get(async (req, res) => {
    const districts = await District.findAll();

    res.status(200).json({ districts });
  })
  .use(checkAuthAdmin)
  .post(async (req, res) => {
    const createdDistrict = await District.create({
      ...req.body,
    });
    res.status(201).json(createdDistrict);
  });

export default withSentry(handler);
