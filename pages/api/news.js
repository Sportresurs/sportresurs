import { withSentry, captureException } from "@sentry/nextjs";
import nc from "next-connect";
import getNewsFromInstagram from "../../utils/instagram";

const handler = nc().get((req, res) => {
  getNewsFromInstagram()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      captureException(err);
    });
});

export default withSentry(handler);
