import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { withSentry } from "@sentry/nextjs";
import { User } from "../../../models";

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ email }) {
      const user = await User.findOne({
        where: { email },
        attributes: ["email", "status"],
      });
      if (!user || user.dataValues.status === "deleted") {
        return false;
      }
      if (user.dataValues.status === "pending") {
        User.update({ status: "confirmed" }, { where: { email } });
      }
      return true;
    },
    async redirect(_url, baseUrl) {
      return baseUrl;
    },
  },
};

function Login(req, res) {
  return NextAuth(req, res, options);
}

export default withSentry(Login);
