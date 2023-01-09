import AdminLayout from "templates/adminLayout";
import { Input } from "@/components/atoms/input";
import { ReactElement, use, useEffect } from "react";
import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Heading from "@/components/atoms/heading";
import { Note } from "@/components/atoms/note/index.";
import { useRouter } from "next/router";
import baseUrl from "helpers/baseUrl";

const Admin = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const [message, setMessage] = useState("");
  const [data, setData] = useState<any>({});

  const router = useRouter();
  const { pid } = router.query;

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
    if (formState.isSubmitSuccessful) {
      reset({ name: "", color: "", price: "", imageUrl: "", description: "" });
    }
  }, [formState.isSubmitSuccessful, reset]);

  useEffect(() => {
    const fetchData = async (pid: any) => {
      const res = await fetch(`${baseUrl}/api/product/${pid}`);
      const { product } = await res.json();
      setData(product);
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
          Create Product
        </Heading>
      </Section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <SplitField>
            <Grid type="grid2">
              <Input
                type="text"
                label="Product Name"
                {...register("name")}
                value={data.name}
              />
            </Grid>
            <Grid type="grid2">
              <Input
                type="text"
                label="Description"
                {...register("description")}
                value={data.description}
              />
            </Grid>
          </SplitField>
          <SplitField>
            <Grid type="grid1">
              <Input
                type="text"
                label="Color"
                {...register("color")}
                value="green"
              />
            </Grid>
            <Grid type="grid1">
              <Input
                type="number"
                label="Price"
                {...register("price")}
                value={data.price}
              />
            </Grid>
            <Grid type="grid1">
              <Input
                type="file"
                label="Image"
                {...register("imageUrl")}
                value={data.imageUrl}
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
