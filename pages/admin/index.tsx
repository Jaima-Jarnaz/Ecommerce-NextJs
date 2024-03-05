import AdminLayout from "templates/adminLayout";
import { ReactElement, useEffect } from "react";
import Grid from "@/components/atoms/grid";
import Section from "@/components/atoms/section";
import SplitField from "@/components/atoms/splitField";
import Button from "@/components/atoms/button";
import { useState } from "react";
import Heading from "@/components/atoms/heading";
import imageUpload from "helpers/imageUpload";
import CustomInput from "@/components/atoms/custom-input";
import Toaster from "@/components/atoms/toaster";
import { STATIC_TEXTS } from "@settings/settings";
import Loader from "@/components/atoms/loader";
const Admin = () => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<any>();
  const [promoCode, setPromoCode] = useState<any>("");
  const [brand, setBrand] = useState<any>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [toasterType, setToasterType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Image handler
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
  };

  const handleSubmit: any = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);

    //Image uploading in cloudinary
    const imageFile = await imageUpload(image);

    //form data
    const formData: any = {
      name,
      description,
      price,
      color,
      imageUrl: { public_id: imageFile.public_id, url: imageFile.secure_url },
      promoCode,
      brand,
    };

    //Create new product
    try {
      const jsonData = JSON.stringify(formData);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      };
      const product = await fetch(
        `${process.env.NEXT_PUBLIC_PRODUCT_CREATE_API}`,
        options
      );
      const result = await product.json();
      console.log(result);
      // if(result){
      //   setIsLoading(false);

      // }
      setIsSubmitted(true);
      setToasterType("success");
      setMessage(STATIC_TEXTS.product_created_success);
      setName("");
      setDescription("");
      setPrice("");
      setColor("");
      setBrand("");
      setPromoCode("");
      setImage("");
      setTimeout(() => {
        setToasterType("");
      }, 2000);
    } catch (error) {
      setToasterType("fail");
      setMessage(STATIC_TEXTS.product_created_fail);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
    }
  };

  return (
    <>
      {isSubmitted && toasterType ? (
        <Toaster type={toasterType} message={message} />
      ) : (
        ""
      )}

      <Section>
        <Heading tag="h1" fontSize="28" alignment="left">
          Create Single Product
        </Heading>
      </Section>

      {isLoading ? <Loader type="half" /> : ""}

      <form onSubmit={handleSubmit}>
        <Section>
          <SplitField>
            <CustomInput
              type="text"
              label="Product Name"
              name="name"
              value={name}
              handleChange={(e: any) => {
                setName(e.target.value);
              }}
            />
            <CustomInput
              type="text"
              label="Description"
              name="description"
              value={description}
              handleChange={(e: any) => {
                setDescription(e.target.value);
              }}
            />
          </SplitField>
          <SplitField>
            <CustomInput
              type="text"
              label="Color"
              name="color"
              value={color}
              handleChange={(e: any) => {
                setColor(e.target.value);
              }}
            />
            <CustomInput
              type="number"
              label="Price"
              name="price"
              value={price}
              handleChange={(e: any) => {
                setPrice(e.target.value);
              }}
            />
            <CustomInput
              type="file"
              label="Image"
              name="imageUrl"
              handleChange={handleImage}
            />
          </SplitField>
          <SplitField>
            <CustomInput
              type="text"
              label="Promo Code"
              name="promo_code"
              placeholder="PROMO-60"
              handleChange={(e: any) => setPromoCode(e.target.value)}
            />
            <CustomInput
              type="text"
              label="Brand"
              name="brand"
              handleChange={(e: any) => setBrand(e.target.value)}
            />
          </SplitField>
          <Button type="primary">SUBMIT</Button>
        </Section>
      </form>
    </>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
