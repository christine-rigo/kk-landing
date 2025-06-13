import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      'monumental-malabi-e5e9e5.netlify.app',
      'cdn.dev.watechnology.com'
    ],
  },
  webpack(config) {
    config.externals.push("pino-pretty", "lokijs", "encoding");

    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  }
};

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig;
