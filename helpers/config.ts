const cloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dgtz6af7c";

export const cloudinary = {
  cloudName,
  api:
    process.env.NEXT_PUBLIC_CLOUDINARY_API ??
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  uploadPreset:
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "new_products",
};

export const geonames = {
  username: process.env.NEXT_PUBLIC_GEO_NAMES_USERNAME ?? "jaima",
};
