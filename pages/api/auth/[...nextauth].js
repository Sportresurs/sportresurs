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
      const user = await User.findOne({ where: { email } });
      if (!user || user.status === "deleted") {
        return false;
      }
      if (user.status !== "confirmed") {
        user.status = "confirmed";
        await user.save();
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
