  // image upload ......
const imageUpload = async (imageData) => {
    const image = new FormData();
    image.append("file", imageData);
    image.append("upload_preset",`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`);
    image.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLOUDINARY_API}`,
      {
        method: "POST",
        body: image,
      }
    );
    return await res.json();
  };
  export default imageUpload