/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['phucanhcdn.com','www.phucanh.vn','203.162.10.102'],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "upgrade-insecure-requests"
                    }
                ]
            }
        ]
    }
};

module.exports = nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     experimental: {
//       serverMinification: false
//     },
//     // output: "standalone",
//     swcMinify: true,
//     modularizeImports: {
//       '@mui/icons-material': {
//         transform: '@mui/icons-material/{{member}}',
//       },
//     },
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'localhost',
//           port: '8000',
//           pathname: '/images/**',
//         },
//       ],
//     },
//   };
  
//   module.exports = nextConfig;
  


// module.exports = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 's3.amazonaws.com',
//           port: '',
//           pathname: '/my-bucket/**',
//         },
//       ],
//     },
//   }