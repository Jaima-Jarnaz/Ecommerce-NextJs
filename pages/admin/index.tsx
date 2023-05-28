import AdminLayout from "templates/adminLayout";
import { Input } from "@/components/atoms/input";
import { ReactElement, useEffect } from "react";
import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import { useState } from "react";
import Heading from "@/components/atoms/heading";
import { Note } from "@/components/atoms/note/index.";
import imageUpload from "helpers/imageUpload";
import CustomInput from "@/components/atoms/custom-input";
import { ProductsDataTypes } from "helpers/types";

const Admin = () => {
  //const { register, handleSubmit, reset, formState } = useForm();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<any>();
  const [imageUrl, setImageUrl] = useState<any>();
  const [message, setMessage] = useState("");

  // Image handler
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      base64ImageGenerate(file);
    }
  };

  // Convert image to base64
  const base64ImageGenerate = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      const base64ImageUrl = fileReader.result as string;
      setImageUrl(base64ImageUrl);
    };
  };

  // Submit handler
  const handleSubmit: any = async (e: Event) => {
    e.preventDefault();

    const formData: any = {
      name,
      description,
      price,
      color,
      imageUrl,
    };
    const convertedJsonData = JSON.stringify(formData);

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertedJsonData,
      };
      const product = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_CREATE_API}`,
        options
      );
      const result = await product.json();
      console.log("result", result);

      if (result.success === true) {
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
        setMessage(result.message);
      }
    } catch (error) {
      console.log(error);
    }
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
                handleChange={handleImage}
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
