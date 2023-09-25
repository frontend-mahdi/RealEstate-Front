/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/system",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
