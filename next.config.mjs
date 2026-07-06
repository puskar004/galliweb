/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Shop photos are uploaded to Cloudinary, so Next/Image needs
    // permission to optimize images served from that domain.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },
};

export default nextConfig;
