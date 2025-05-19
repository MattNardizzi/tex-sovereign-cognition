/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,   // ← allows build even with lint errors
  },
};

module.exports = nextConfig;
