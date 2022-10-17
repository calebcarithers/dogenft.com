/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const withTm = require('next-transpile-modules')(['dsl', 'ownthedoge', 'three'])
module.exports = withTm(nextConfig)
