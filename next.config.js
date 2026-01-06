/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // এই '**' চিহ্নটি যেকোনো ডোমেইন অ্যালাউ করে দেয়
      },
    ],
  },
};

module.exports = nextConfig;
