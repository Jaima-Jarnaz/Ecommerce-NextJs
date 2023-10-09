import { Input } from "@/components/atoms/input";
import CustomInput from "@/components/atoms/custom-input";
import Button from "@/components/atoms/button";
import { Note } from "@/components/atoms/note/index.";
import Container from "@/components/atoms/container";
import Heading from "@/components/atoms/heading";
import { FORM_DATA_TYPES } from "helpers/types";
import { useState } from "react";
import { useRouter } from "next/router";

const SignIn = () => {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const initialState = {
    email: "",
    password: "",
  };

  // Define a key for local storage
  const USER_LOCAL_STORAGE_KEY = "user";

  const [formData, setFormData] = useState<any>(initialState);
  const [validationErrors, setValidationErrors] = useState<any>(initialState);
  const [error, setError] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    //perform validation errors
    let errors: any = {};

    if (formData.email.trim() === "") {
      errors.email = "Email is required";
    }

    if (formData.password.trim() === "") {
      errors.password = "Password is required";
    }

    // Checking errors length
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      //Create new user registration logic
      try {
        console.log(formData);
        const jsonData = JSON.stringify(formData);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        };
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_USER_LOGIN_API}`,
          options
        );
        const result = await user.json();
        setMessage(result.message);

        if (result.success === true) {
          setError(false);

          // Reset the form state
          setFormData(initialState);

          setValidationErrors(initialState);

          //set data into local storage
          const userData = {
            email: result.data.email,
            phone: result.data.phone,
          };
          localStorage.setItem(
            USER_LOCAL_STORAGE_KEY,
            JSON.stringify(userData)
          );
          // router.push("/auth/signin");
        } else {
          setError(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Container width="400" margin="middle" type="withShadow" padding="30">
      {/* {message ? <Note color={error ? "danger" : "green"}>{message}</Note> : ""} */}

      <Container>
        <Heading tag="h4">Sign In</Heading>
      </Container>
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="email"
          label="Email"
          name="email"
          handleChange={handleInputChange}
          value={formData.email}
        />
        {validationErrors.email && (
          <Note color="danger">{validationErrors.email}</Note>
        )}
        <CustomInput
          type="password"
          label="Password"
          name="Password"
          handleChange={handleInputChange}
          value={formData.phone}
        />
        {/* {validationErrors.phone && (
          <Note color="danger">{validationErrors.phone}</Note>
        )} */}

        <Button type="primary">SUBMIT</Button>
      </form>
    </Container>
  );
};

export default SignIn;
