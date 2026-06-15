import { cloudinary } from "./config";

const imageUpload = async (imageData) => {
  try {
    const image = new FormData();
    image.append("file", imageData);
    image.append("upload_preset", cloudinary.uploadPreset);
    image.append("cloud_name", cloudinary.cloudName);
    const res = await fetch(cloudinary.api, {
      method: "POST",
      body: image,
    });
    return await res.json();
  } catch (error) {
    console.log("Something went wrong from cloudinary.", error);
  }
};
export default imageUpload;
