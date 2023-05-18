import './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com'],
  },
  experimental: {
    serverActions: true,
  },
}

export default nextConfig
