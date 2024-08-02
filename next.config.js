// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = {
//     images:
//     {
//         domains: ['*'],
//     },
// };


// next.config.js
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
        {
          protocol: 'http',
          hostname: '**',
        },
      ],
    },
  };
  
  