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
      const count = await User.count({ where: { email } });
      return count > 0;
    },
  },
};

function Login(req, res) {
  return NextAuth(req, res, options);
}

export default withSentry(Login);
