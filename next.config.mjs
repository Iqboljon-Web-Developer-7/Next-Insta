/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  swcMinify: true,
  images: {
    domains: ["files.moontv.uz"],
  },
};

export default nextConfig;
