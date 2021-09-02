import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    "https://211ad6a7e8e34c839b2ec2e66e6fc2d2@o985913.ingest.sentry.io/5942355",
  tracesSampleRate: 1.0,
});
