// /** @type {import('next').NextConfig} */

const sassGlobImporter = require("node-sass-glob-importer");
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com",
    //     port: "",
    //   },
    // ],
  },

  sassOptions: { importer: sassGlobImporter() },
};

module.exports = nextConfig;

// const sassGlobImporter = require("node-sass-glob-importer");
// const withImages = require("next-images");
// module.exports = withImages({
//   async headers() {
//     return [
//       {
//         source: "/home",
//         headers: [
//           {
//             key: "WWW-Authenticate",
//             value: 'Basic realm="example"',
//           },
//           { key: "Access-Control-Allow-Credentials", value: "true" },
//           { key: "Access-Control-Allow-Origin", value: "*" },
//           {
//             key: "Access-Control-Allow-Methods",
//             value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//           },
//           {
//             key: "Access-Control-Allow-Headers",
//             value:
//               "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//           },
//         ],
//       },
//     ];
//   },
//   trailingSlash: true,
//   experimental: {
//     optimizeFonts: true,
//   },
//   images: {
//     disableStaticImages: true,
//   },
//   sassOptions: { importer: sassGlobImporter() },
// });
