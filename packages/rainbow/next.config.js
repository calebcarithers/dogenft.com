/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const withTm = require('next-transpile-modules')(['dsl', 'ownthedoge'])
module.exports = withTm(nextConfig)
