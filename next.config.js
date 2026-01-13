const { withSentryConfig } = require("@sentry/nextjs");
require("dotenv-safe").config({ allowEmptyValues: true });

const moduleExports = {
  reactStrictMode: true,

  images: {
    domains: ["localhost"],
  },

  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },

  webpack(config) {
    config.output.hashFunction = "xxhash64";

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
};

const SentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
