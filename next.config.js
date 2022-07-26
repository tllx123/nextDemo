/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/webapi/:path*', destination: `http://team.yindangu.com/webapi/:path*` }
    ]
  }
}

module.exports = nextConfig


