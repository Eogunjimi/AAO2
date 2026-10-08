/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Allow the preview sandbox host used by Arena/e2b to talk to the dev server.
  allowedDevOrigins: ['https://*.e2b.app'],
  webpack: (config) => {
    config.plugins = config.plugins || [];
    const ignoreWarnings = [{ module: /node_modules/ }];
    config.ignoreWarnings = [...(config.ignoreWarnings || []), ...ignoreWarnings];
    return config;
  },
};

export default nextConfig;
