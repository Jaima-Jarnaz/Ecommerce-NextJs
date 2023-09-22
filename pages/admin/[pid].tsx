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
import Image from "next/image";
import camera from "public/camera.jpg";
import imageUpload from "helpers/imageUpload";

const Admin = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  //Storing image data from database
  const [image, setImage] = useState<any>();
  const [imagePublicId, setImagePublicId] = useState<any>();

  //Storing updated image data
  const [dataUrl, setDataUrl] = useState<any>();
  const [updatedImageUrl, setUpdatedImageUrl] = useState<any>();

  const router = useRouter();
  const { pid } = router.query;
  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted
    const imageUploadData = async () => {
      const imageView = await imageUpload(updatedImageUrl);
      if (isMounted) {
        setDataUrl(imageView);
      }
    };
    imageUploadData();

    // Cleanup function
    return () => {
      isMounted = false;
      // Update the flag to indicate the component is unmounted
    };
  }, [updatedImageUrl]);

  //Form submit handler for Update product details
  const handleSubmit: any = async (e: Event) => {
    e.preventDefault();

    let imageFile;

    //Checking image file updated or not
    if (dataUrl.error) {
      imageFile = {
        public_id: imagePublicId,
        url: image,
      };
    } else {
      imageFile = {
        public_id: dataUrl.public_id,
        url: dataUrl.secure_url,
      };
    }

    //All updated form data
    const dataObj = {
      name,
      description,
      price,
      color,
      imageUrl: imageFile,
    };

    const jsonData = JSON.stringify(dataObj);
    console.log(jsonData);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    //API for update product details
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_UPDATE_API}/${pid}`,
        options
      );
      const result = await res.json();
      console.log(result);
      setMessage(result.message);
    } catch (error) {
      console.error("here is the error", error);
    }
  };

  // Fetch single product details
  useEffect(() => {
    const fetchData = async (pid: any) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_GET_SINGLE_API}/${pid}`
      );
      const { product } = await res.json();
      console.log("product", product);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setColor(product.color);

      if (product.imageUrl) {
        setImage(product.imageUrl.url);
        setImagePublicId(product.imageUrl.public_id);
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
                type="text"
                label="Color"
                name="color"
                value={color}
                handleChange={(e: any) => {
                  setColor(e.target.value);
                }}
              />
            </Grid>
          </SplitField>
          <SplitField>
            <Grid type="grid1">
              <CustomInput
                type="file"
                label="Image"
                name="image"
                handleChange={(e: any) => {
                  setUpdatedImageUrl(e.target.files[0]);
                }}
              />
            </Grid>
            <Grid type="grid1">
              <Image
                src={image}
                width={125}
                height={125}
                alt="image"
                style={{ margin: "50px", borderRadius: "12px" }}
              />
            </Grid>
          </SplitField>
          <Button type="primary">Update</Button>
        </Section>
      </form>
    </>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
