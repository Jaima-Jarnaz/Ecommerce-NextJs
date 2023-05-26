import AdminLayout from "templates/adminLayout";
import { Input } from "@/components/atoms/input";
import { ReactElement, useEffect } from "react";
import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
//import { useForm } from "react-hook-form";
import { useState } from "react";
import Heading from "@/components/atoms/heading";
import { Note } from "@/components/atoms/note/index.";
import imageUpload from "helpers/imageUpload";
import CustomInput from "@/components/atoms/custom-input";

const Admin = () => {
  //const { register, handleSubmit, reset, formState } = useForm();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<any>();
  const [imageUrl, setImageUrl] = useState<any>();

  const [message, setMessage] = useState("");

  // const onSubmit: any = async (data: any, e: Event) => {
  //   e.preventDefault();
  //   const imageUrl = await imageUpload(data.imageUrl[0]);
  //   const dataObj = {
  //     ...data,
  //     imageUrl: { id: imageUrl.public_id, url: imageUrl.url },
  //   };

  //   const jsonData = JSON.stringify(dataObj);
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: jsonData,
  //   };
  //   const product = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_CREATE_API}`, options)
  //   const result = await product.json();
  //   setMessage(result.message);
  // };

  const handleSubmit: any = async (e: Event) => {
    e.preventDefault();

    const dataObj = {
      name,
      description,
      price,
      imageUrl,
    };

    const fileReader = new FileReader();
    console.log("fileReader result", fileReader.result);

    fileReader.readAsDataURL(image);
    fileReader.onloadend = () => {
      setImageUrl(fileReader.result);
    };

    console.log("data", dataObj);
    //const imageData = await generateImage(image);

    // const jsonData = JSON.stringify(dataObj);
    // console.log("jsonData", jsonData);

    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: jsonData,
    // };
    // const product = await fetch(
    //   `${process.env.NEXT_PUBLIC_PRODUCT_CREATE_API}`,
    //   options
    // );
    // const result = await product.json();
    // setMessage(result.message);
  };

  const generateImage = (image: File) => {
    console.log("generateImage", image);
    const fileReader = new FileReader();
    console.log("fileReader", fileReader);
    console.log("fileReader result", fileReader.result);

    fileReader.readAsDataURL(image);
    fileReader.onloadend = () => {
      setImageUrl(fileReader.result);
      return fileReader.result;
    };
  };

  // useEffect(() => {
  //   if (formState.isSubmitSuccessful) {
  //     reset({ name: "", color: "", price: "", imageUrl: "", description: "" });
  //   }
  // }, [formState.isSubmitSuccessful, reset]);

  return (
    <>
      {message ? <Note color="green">{message}</Note> : ""}
      <Section>
        <Heading tag="h1" fontSize="28" alignment="left">
          Create Single Product
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
                type="text"
                label="Color"
                name="color"
                value={color}
                handleChange={(e: any) => {
                  setColor(e.target.value);
                }}
              />
            </Grid>
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
                  setImage(e.target.files[0]);
                }}
              />
            </Grid>
          </SplitField>
          <Button>SUBMIT</Button>
        </Section>
      </form>
    </>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
