import { getSession } from "next-auth/client";

const checkAuthAdmin = async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("You don't have access.");
  }
  return next();
};

export default checkAuthAdmin;
