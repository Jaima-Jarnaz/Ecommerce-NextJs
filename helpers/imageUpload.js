import { cloudinary } from "./config";

const imageUpload = async (imageData) => {
  if (!imageData) {
    return { error: true, message: "No image file provided." };
  }

  try {
    const image = new FormData();
    image.append("file", imageData);
    image.append("upload_preset", cloudinary.uploadPreset);
    image.append("cloud_name", cloudinary.cloudName);
    const res = await fetch(cloudinary.api, {
      method: "POST",
      body: image,
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        error: true,
        message: data?.error?.message || "Image upload failed.",
      };
    }

    return data;
  } catch (error) {
    console.error("Something went wrong from cloudinary.", error);
    return { error: true, message: "Image upload failed." };
  }
};
export default imageUpload;
