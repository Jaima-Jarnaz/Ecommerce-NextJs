import AdminLayout from "templates/adminLayout";
import { Input } from "@/components/atoms/input";
import { ReactElement, use } from "react";
import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Heading from "@/components/atoms/heading";
import { Note } from "@/components/atoms/note/index.";
const Admin = () => {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const onSubmit: any = async (data: any, e: Event) => {
    e.preventDefault();

    const imageUrl = await imageUpload(data.imageUrl[0]);
    const dataObj = {
      ...data,
      imageUrl: { id: imageUrl.public_id, url: imageUrl.url },
    };

    const jsonData = JSON.stringify(dataObj);

    const endpoint = "/api/products";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    const res = await fetch(endpoint, options);

    const result = await res.json();
    setMessage(result.message);
    console.log(result);
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

  return (
    <>
      {message ? <Note color="green">{message}</Note> : ""}
      <Section>
        <Heading tag="h1" fontSize="28" alignment="left">
          Create Product
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
