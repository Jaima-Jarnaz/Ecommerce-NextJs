import AdminLayout from "templates/adminLayout";
import { Input } from "@/components/atoms/input";
import { ReactElement,useEffect } from "react";
import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Heading from "@/components/atoms/heading";
import { Note } from "@/components/atoms/note/index.";
import imageUpload from "helpers/imageUpload";

const Admin = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit: any = async (data: any, e: Event) => {
    e.preventDefault();
    const imageUrl = await imageUpload(data.imageUrl[0]);
    const dataObj = {
      ...data,
      imageUrl: { id: imageUrl.public_id, url: imageUrl.url },
    };

    const jsonData = JSON.stringify(dataObj);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };
    const product = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_CREATE_API}`, options)
    const result = await product.json();
    setMessage(result.message);
  };


  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: "", color: "", price: "", imageUrl: "", description: "" });
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <>
      {message ? <Note color="green">{message}</Note> : ""}
      <Section>
        <Heading tag="h1" fontSize="28" alignment="left">
          Create Single Product
        </Heading>
      </Section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <SplitField>
            <Grid type="grid2">
              <Input type="text" label="Product Name" {...register("name")} />
            </Grid>
            <Grid type="grid2">
              <Input
                type="text"
                label="Description"
                {...register("description")}
              />
            </Grid>
          </SplitField>
          <SplitField>
            <Grid type="grid1">
              <Input type="text" label="Color" {...register("color")} />
            </Grid>
            <Grid type="grid1">
              <Input type="number" label="Price" {...register("price")} />
            </Grid>
            <Grid type="grid1">
              <Input type="file" label="Image" {...register("imageUrl")} />
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
