import { captureException, withSentry } from "@sentry/nextjs";
import nc from "next-connect";
import { getSession } from "next-auth/client";
import { BlockedNews, User } from "../../../models";
import { clearNewsCache } from "../../../utils/instagram";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

const handler = nc()
  .use(checkAuthAdmin)
  .post(async (req, res) => {
    try {
      const { instagram_id: instagramId, url } = req.body;
      const session = await getSession({ req });
      const user = await User.findOne({ where: { email: session.user.email } });
      const id = await BlockedNews.create(
        {
          instagram_id: instagramId,
          url,
          created_by: user.id,
        },
        { returning: ["instagram_id"] }
      );
      clearNewsCache();
      res.send({ result: id });
    } catch (err) {
      captureException(err);
      res.status(500).send({ error: err.name });
    }
  });

export default withSentry(handler);
