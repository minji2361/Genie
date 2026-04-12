import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'caymroqwpaqyppsopyva.supabase.co',
                pathname: '/**',
            },
        ],
    },
    reactStrictMode: true,
};

export default nextConfig;
