const { withSentryConfig } = require("@sentry/nextjs");
require('dotenv-safe').config({ allowEmptyValues: true });

const moduleExports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|jsx)$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
      ],
    });
    return config;
  },
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
};

const SentryWebpackPluginOptions = {
  silent: true,
};

module.exports = {
  images: {
    domains: ["localhost"],
  },
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
