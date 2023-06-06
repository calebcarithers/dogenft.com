/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["remote-image.decentralized-content.com"],
  },
};

const withTm = require("next-transpile-modules")(["dsl"]);
module.exports = withTm(nextConfig);
