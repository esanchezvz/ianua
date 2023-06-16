import { env } from './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com', `${env.NEXT_PUBLIC_SUPABASE_PROJECT}.supabase.co`],
  },
}

export default nextConfig
