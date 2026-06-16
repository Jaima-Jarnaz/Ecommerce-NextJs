import CustomInput from "@/components/atoms/custom-input";
import Button from "@/components/atoms/button";
import { Note } from "@/components/atoms/note/index.";
import { setCookie } from "cookies-next";
import { SIGNUP_URL } from "helpers/constants";
import apiRoutes from "helpers/apiRoutes";
import {
  DEFAULT_ERROR_MESSAGE,
  fetchJson,
  getErrorMessage,
  getResponseMessage,
} from "helpers/apiClient";
import Link from "next/link";
import { useState } from "react";

const SignIn = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const USER_LOCAL_STORAGE_KEY = "user";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: any = {};
    if (email.trim() === "") errors.email = "Email is required";
    if (password.trim() === "") errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const result = await fetchJson(apiRoutes.users.signin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      setMessage(getResponseMessage(result, DEFAULT_ERROR_MESSAGE));

      if (result.success === true) {
        setError(false);
        setValidationErrors({});

        const user = result.data as {
          name: string;
          email: string;
          phone: string;
          token: string;
        };

        localStorage.setItem(
          USER_LOCAL_STORAGE_KEY,
          JSON.stringify({
            name: user.name,
            email: user.email,
            phone: user.phone,
          })
        );

        setCookie("access_token", user.token);
        window.location.reload();
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
      setMessage(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-signin">
      <div className="p-signin__card">
        <div className="p-signin__logo">Fashionova</div>
        <div className="p-signin__title">
          <h4>Welcome back</h4>
          <p>Sign in to your account to continue</p>
        </div>

        {message ? (
          <Note color={error ? "danger" : "green"}>{message}</Note>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div className="p-signin__field">
            <CustomInput
              type="email"
              label="Email address"
              name="email"
              handleChange={(e: any) => setEmail(e.target.value)}
              value={email}
            />
            {validationErrors.email && (
              <Note color="danger">{validationErrors.email}</Note>
            )}
          </div>

          <div className="p-signin__field">
            <div className="p-signin__passoword-input">
              <CustomInput
                type="password"
                label="Password"
                name="password"
                handleChange={(e: any) => setPassowrd(e.target.value)}
                value={password}
              />
              {validationErrors.password && (
                <Note color="danger">{validationErrors.password}</Note>
              )}
              <span className="p-signin__forgot-password">
                <Link href={SIGNUP_URL}>Forgot password?</Link>
              </span>
            </div>
          </div>

          <div className="p-signin__submit">
            <Button type="primary" isDisabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </div>
        </form>

        <div className="p-signin__footer">
          Don&apos;t have an account? <Link href={SIGNUP_URL}>Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
