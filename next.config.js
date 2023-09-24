/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STRAPI_API: process.env.STRAPI_API,
    API_URL: process.env.API_URL,
    STRIPE_KEY: process.env.STRIPE_KEY,
  },
  images: {
    // unoptimized: true,
    // path: "/_next/image",
    loader: "default",
    domains: [process.env.SANITY_API],
  },
};

module.exports = nextConfig;
