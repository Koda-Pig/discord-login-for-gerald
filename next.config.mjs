/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/avatars/**"
      }
    ]
  },
  webpack: (config) => {
    config.externals.push("pino-pretty");
    return config;
  }
};

export default nextConfig;
