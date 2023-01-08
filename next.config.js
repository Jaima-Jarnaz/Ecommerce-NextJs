/** @type {import('next').NextConfig} */

const sassGlobImporter = require("node-sass-glob-importer");
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  images: {
    domains: ["res.cloudinary.com"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // limit of 25 imageSizes values
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // path prefix for Image Optimization API, useful with `loader`
    path: "/_next/image",
    // loader can be 'default', 'imgix', 'cloudinary', 'akamai', or 'custom'
    loader: "cloudinary",
    // file with `export default function loader({src, width, quality})`
    loaderFile: "",
    // disable static imports for image files
    disableStaticImages: false,
    // minimumCacheTTL is in seconds, must be integer 0 or more
    minimumCacheTTL: 60,
    // ordered list of acceptable optimized image formats (mime types)
    formats: ["image/webp"],
    // enable dangerous use of SVG images
    dangerouslyAllowSVG: false,
    // set the Content-Security-Policy header
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // limit of 50 objects
    remotePatterns: [],
    // when true, every image will be unoptimized
    unoptimized: false,
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
