import { Input } from "@/components/atoms/input";
import { setCookie } from "cookies-next";
import CustomInput from "@/components/atoms/custom-input";
import Button from "@/components/atoms/button";
import { Note } from "@/components/atoms/note/index.";
import Container from "@/components/atoms/container";
import Heading from "@/components/atoms/heading";
import { FORM_DATA_TYPES } from "helpers/types";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SIGNUP_URL } from "helpers/constants";
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

  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    //perform validation errors
    let errors: any = {};

    if (email.trim() === "") {
      errors.email = "Email is required";
    }
    if (password.trim() === "") {
      errors.password = "Password is required";
    }

    //---------Checking errors length----------
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      //-------Create new user registration logic-------------
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
          `${process.env.NEXT_PUBLIC_USER_LOGIN_API}`,
          options
        );
        const result = await user.json();
        setMessage(result.message);

        if (result.success === true) {
          setError(false);

          setValidationErrors(initialState);

          //---------set data into local storage---------
          const userData = {
            email: result.data.email,
            phone: result.data.phone,
          };

          localStorage.setItem(
            USER_LOCAL_STORAGE_KEY,
            JSON.stringify(userData)
          );

          //--------set token into localstorage----------
          const token = result.data.token;
          setCookie("access_token", token);

          window.location.reload();
        } else {
          setError(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="p-signin">
      <Container width="400" margin="middle" type="withShadow" padding="30">
        {message ? (
          <Note color={error ? "danger" : "green"}>{message}</Note>
        ) : (
          ""
        )}
        <Container>
          <Heading tag="h4">Sign In</Heading>
        </Container>
        <form onSubmit={handleSubmit}>
          <CustomInput
            type="email"
            label="Email"
            name="email"
            handleChange={(e: any) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          {validationErrors.email && (
            <Note color="danger">{validationErrors.email}</Note>
          )}
          <div className="p-signin__passoword-input">
            <CustomInput
              type="password"
              label="Password"
              name="Password"
              handleChange={(e: any) => {
                setPassowrd(e.target.value);
              }}
              value={password}
            />
            {validationErrors.password && (
              <Note color="danger">{validationErrors.password}</Note>
            )}
            <span className="p-signin__forgot-password">
              <Link href={SIGNUP_URL}>forgot password?</Link>
            </span>
          </div>

          <Button type="primary">SUBMIT</Button>
        </form>
      </Container>
    </div>
  );
};

export default SignIn;
