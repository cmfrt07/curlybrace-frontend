/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.zupimages.net", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
