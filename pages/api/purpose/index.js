import { withSentry } from "@sentry/nextjs";
import nextConnect from "next-connect";
import { Purpose } from "../../../models/index";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nextConnect()
  .get(async (req, res) => {
    const purposes = await Purpose.findAll();

    res.status(200).json({ purposes });
  })
  .use(checkAuthAdmin)
  .post(async (req, res) => {
    const createdPurpose = await Purpose.create({
      ...req.body,
    });
    res.status(201).json(createdPurpose);
  });

export default withSentry(handler);
