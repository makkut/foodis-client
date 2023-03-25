/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: { STRAPI_API: process.env.STRAPI_API, API_URL: process.env.API_URL },
  images: {
    // unoptimized: true,
    // path: "/_next/image",
    loader: "default",
    domains: [process.env.STRAPI_API],
  },
};

module.exports = nextConfig;
