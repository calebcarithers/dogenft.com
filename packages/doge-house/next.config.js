/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withTm = require("next-transpile-modules")([
  "dsl",
  "ownthedoge",
  "rainbow",
]);

module.exports = withTm(nextConfig);
