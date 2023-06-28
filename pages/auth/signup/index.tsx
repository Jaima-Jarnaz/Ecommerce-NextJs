import { Input } from "@/components/atoms/input";
import CustomInput from "@/components/atoms/custom-input";
import Button from "@/components/atoms/button";
import { Note } from "@/components/atoms/note/index.";
import Container from "@/components/atoms/container";
import Heading from "@/components/atoms/heading";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState<any>();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      phone,
      password,
      confirmPassword,
    };
    //Create new user registration
    try {
      const jsonData = JSON.stringify(formData);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      };
      const user = await fetch(
        `${process.env.NEXT_PUBLIC_USER_CREATE_API}`,
        options
      );
      const result = await user.json();
      setMessage(result.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container width="400" margin="middle" type="withShadow" padding="30">
      {message ? <Note color="green">{message}</Note> : ""}

      <Container>
        <Heading tag="h4">Sign Up</Heading>
      </Container>
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          label="Name"
          handleChange={(e: any) => {
            setName(e.target.value);
          }}
        />
        <CustomInput
          type="email"
          label="Email"
          handleChange={(e: any) => {
            setEmail(e.target.value);
          }}
        />
        <CustomInput
          type="number"
          label="Phone"
          handleChange={(e: any) => {
            setPhone(e.target.value);
          }}
        />
        <CustomInput
          type="password"
          label="Password"
          handleChange={(e: any) => {
            setPassword(e.target.value);
          }}
        />
        <CustomInput
          type="password"
          label="Confirm Password"
          handleChange={(e: any) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <Button>SUBMIT</Button>
      </form>
    </Container>
  );
};

export default SignUp;
