/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
    sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
  },
}

const withTm = require('next-transpile-modules')(['dsl', 'ownthedoge', 'three'])
module.exports = withTm(withSentryConfig(nextConfig))
