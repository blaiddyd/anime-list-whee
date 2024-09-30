/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's4.anilist.co',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com'
            },
            {
                protocol: 'https',
                hostname: '64.media.tumblr.com'
            },
            {
                protocol: 'https',
                hostname: 'media.tenor.com'
            }
        ]
    }
};

export default nextConfig;
