/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['phucanhcdn.com','www.phucanh.vn'],
    },
};

export default nextConfig;



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