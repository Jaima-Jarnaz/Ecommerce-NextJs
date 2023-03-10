import AdminLayout from "templates/adminLayout";
import CustomInput from "@/components/atoms/custom-input";
import { ReactElement, useEffect } from "react";
import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import { useState } from "react";
import Heading from "@/components/atoms/heading";
import { Note } from "@/components/atoms/note/index.";
import { useRouter } from "next/router";
import baseUrl from "helpers/baseUrl";
import Image, { StaticImageData } from "next/image";
import camera from "public/camera.jpg";

type Image_URL = {
  id: string;
  url: string;
};

const Admin = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState<any>();
  const [image, setImage] = useState<string | StaticImageData>();

  const router = useRouter();
  const { pid } = router.query;

  const handleSubmit: any = async (e: Event) => {
    e.preventDefault();

    const image = await imageUpload(imageUrl);
    const dataObj = {
      name,
      description,
      price,
      imageUrl: { id: image.public_id, url: image.url },
    };

    console.log("dataObj", dataObj);

    const jsonData = JSON.stringify(dataObj);

    const endpoint = `${baseUrl}/api/product/${pid}`;

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    const res = await fetch(endpoint, options);

    const result = await res.json();
    setMessage(result.message);
    if (result.isSuccess) {
    }
  };

  //image upload ......
  const imageUpload = async (data2: any) => {
    const data = new FormData();
    data.append("file", data2);
    data.append("upload_preset", "myStore");
    data.append("cloud_name", "dgtz6af7c");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgtz6af7c/image/upload",

      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();
    return res2;
  };

  useEffect(() => {
    const fetchData = async (pid: any) => {
      const res = await fetch(`${baseUrl}/api/product/${pid}`);
      const { product } = await res.json();
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      if (product.imageUrl) {
        setImage(product.imageUrl.url);
      }
    };

    if (pid) {
      fetchData(pid);
    }
  }, [pid]);

  return (
    <>
      {message ? <Note color="green">{message}</Note> : ""}
      <Section>
        <Heading tag="h1" fontSize="28" alignment="left">
          Update Product
        </Heading>
      </Section>
      <form onSubmit={handleSubmit}>
        <Section>
          <SplitField>
            <Grid type="grid2">
              <CustomInput
                type="text"
                label="Product Name"
                name="name"
                value={name}
                handleChange={(e: any) => {
                  setName(e.target.value);
                }}
              />
            </Grid>
            <Grid type="grid2">
              <CustomInput
                type="text"
                label="Description"
                name="description"
                value={description}
                handleChange={(e: any) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
          </SplitField>
          <SplitField>
            <Grid type="grid1">
              <CustomInput
                type="number"
                label="Price"
                name="price"
                value={price}
                handleChange={(e: any) => {
                  setPrice(e.target.value);
                }}
              />
            </Grid>
            <Grid type="grid1">
              <CustomInput
                type="file"
                label="Image"
                name="imageUrl"
                handleChange={(e: any) => {
                  setImageUrl(e.target.files[0]);
                }}
              />
            </Grid>
            <Grid type="grid1">
              <Image
                src={image ? image : camera}
                width={125}
                height={125}
                alt="image"
                style={{ margin: "50px", borderRadius: "12px" }}
              />
            </Grid>
          </SplitField>
          <Button>Update</Button>
        </Section>
      </form>
    </>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
