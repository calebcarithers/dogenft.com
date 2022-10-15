/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dl.airtable.com"]
  }
}

const withTm = require('next-transpile-modules')(['dsl'])

module.exports = withTm(nextConfig)
