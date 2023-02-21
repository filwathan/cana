/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '68xkph-8888.preview.csb.app',
      },
    ],
  },
}

module.exports = nextConfig
