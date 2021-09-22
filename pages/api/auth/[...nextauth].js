import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { withSentry } from "@sentry/nextjs";

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  algorithms: ["HS256"],
};

function Login(req, res) {
  return NextAuth(req, res, options);
}

export default withSentry(Login);
