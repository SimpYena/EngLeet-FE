/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
  eslint:{
    ignoreDuringBuilds: true,
  },
  typescript:{
    ignoreBuildErrors: true
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  }
};

export default nextConfig;
