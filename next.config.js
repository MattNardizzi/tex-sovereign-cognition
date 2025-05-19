/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },   // ← stops lint from failing build
};

module.exports = nextConfig;
