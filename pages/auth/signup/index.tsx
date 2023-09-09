import { Input } from "@/components/atoms/input";
import CustomInput from "@/components/atoms/custom-input";
import Button from "@/components/atoms/button";
import { Note } from "@/components/atoms/note/index.";
import Container from "@/components/atoms/container";
import Heading from "@/components/atoms/heading";
import { FORM_DATA_TYPES } from "helpers/types";
import { useState } from "react";

const SignUp = () => {
  const [message, setMessage] = useState("");

  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState<FORM_DATA_TYPES>(initialState);
  const [validationErrors, setValidationErrors] =
    useState<FORM_DATA_TYPES>(initialState);
  const [error, setError] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    //perform validation errors
    let errors: any = {};

    if (formData.name.trim() === "") {
      errors.name = "Name is required";
    }
    if (formData.email.trim() === "") {
      errors.email = "Email is required";
    }
    if (formData.phone.trim() === "") {
      errors.phone = "Phone number is required";
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
          `${process.env.NEXT_PUBLIC_USER_CREATE_API}`,
          options
        );
        const result = await user.json();
        setMessage(result.message);

        if (result.success === true) {
          setError(false);

          // Reset the form state
          setFormData(initialState);
          setValidationErrors(initialState);
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
      {message ? <Note color={error ? "danger" : "green"}>{message}</Note> : ""}

      <Container>
        <Heading tag="h4">Sign Up</Heading>
      </Container>
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          label="Name"
          name="name"
          handleChange={handleInputChange}
          value={formData.name}
        />
        {validationErrors.name && (
          <Note color="danger">{validationErrors.name}</Note>
        )}
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
          type="number"
          label="Phone"
          name="phone"
          handleChange={handleInputChange}
          value={formData.phone}
        />
        {validationErrors.phone && (
          <Note color="danger">{validationErrors.phone}</Note>
        )}
        <CustomInput
          type="password"
          label="Password"
          name="password"
          handleChange={handleInputChange}
          value={formData.password}
        />
        {validationErrors.password && (
          <Note color="danger">{validationErrors.password}</Note>
        )}
        <CustomInput
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          handleChange={handleInputChange}
          value={formData.confirmPassword}
        />
        {validationErrors.confirmPassword && (
          <Note color="danger">{validationErrors.confirmPassword}</Note>
        )}
        <Button type="primary">SUBMIT</Button>
      </form>
    </Container>
  );
};

export default SignUp;
