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
import imageUpload from 'helpers/imageUpload'


type Image_URL = {
  id: string;
  url: string;
};

const Admin = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState<any>();
  const [dataUrl, setDataUrl] = useState<any>();

  const [image, setImage] = useState<string | StaticImageData>();

  const router = useRouter();
  const { pid } = router.query;


  useEffect(() => {
    let isMounted = true; // Flag to track if the component is still mounted
    const imageUploadData=async()=>{
      const image = await imageUpload(imageUrl);
      if (isMounted) {
        setDataUrl(image);
      }
    }
    imageUploadData()
  
    // Cleanup function
    return () => {
      isMounted = false; // Update the flag to indicate the component is unmounted
    };
  }, [imageUrl])
  

  const handleSubmit: any = async (e: Event) => {
    e.preventDefault();

    //const image = await imageUpload(imageUrl);
    // if(dataUrl){
      

    // }
    console.log('dataUrl',dataUrl)
    const dataObj = {
      name,
      description,
      price,
      imageUrl: { id: dataUrl.public_id, url: dataUrl.url },
    };

    const jsonData = JSON.stringify(dataObj);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_UPDATE_API}/${pid}`, options);
    const result = await res.json();
    setMessage(result.message);
    if (result.isSuccess) {
    }
  };


  useEffect(() => {
    const fetchData = async (pid: any) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_GET_SINGLE_API}/${pid}`);
      const { product } = await res.json();
      console.log(product)
      console.log('product.imageUrl.url',product.imageUrl)

      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setColor(product.color);

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
