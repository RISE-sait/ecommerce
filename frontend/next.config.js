/** @type {import('next').NextConfig} */
const nextConfig = {
    output:"standalone",
    eslint:{
        ignoreDuringBuilds:true
    },
    images:{
        remotePatterns:[
           
            {
                protocol:'https',
                hostname:"klintstorage.blob.core.windows.net",
            }
        ]
    }
}

module.exports = nextConfig
