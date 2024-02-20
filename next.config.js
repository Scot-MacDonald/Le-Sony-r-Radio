/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "media2.ntslive.co.uk",
      "www.zabriskie.de",
      "www.nts.live",
      "www.soundcloud.com",
      "www.media.gq-magazine.co.uk",
    ],
  },
};

module.exports = nextConfig;

module.exports = { eslint: { ignoreDuringBuilds: true } };
