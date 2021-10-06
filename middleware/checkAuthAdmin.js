import { getSession } from "next-auth/client";
import { User } from "../models";

const checkAuthAdmin = async (req, res, next) => {
  const session = await getSession({ req });
  const { email } = session.user;
  const user = await User.findOne({ where: { email } });
  if (!session || user.status === "deleted") {
    return res.status(401).send("You don't have access.");
  }
  if (user.status !== "confirmed") {
    user.status = "confirmed";
    await user.save();
  }
  return next();
};

export default checkAuthAdmin;
