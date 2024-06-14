/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
        ignoreDuringBuilds:true
    },
    images:{
        remotePatterns:[
           
            {
                protocol:'https',
                hostname:"klintstorage1.blob.core.windows.net",
            }
        ]
    }
}

module.exports = nextConfig
