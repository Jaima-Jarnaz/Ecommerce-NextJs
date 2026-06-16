import CustomInput from "@/components/atoms/custom-input";
import Button from "@/components/atoms/button";
import { Note } from "@/components/atoms/note/index.";
import { SIGNIN_URL } from "helpers/constants";
import apiRoutes from "helpers/apiRoutes";
import {
  DEFAULT_ERROR_MESSAGE,
  fetchJson,
  getErrorMessage,
  getResponseMessage,
} from "helpers/apiClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const SignUp = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: any = {};
    if (name.trim() === "") errors.name = "Name is required";
    if (email.trim() === "") errors.email = "Email is required";
    if (password.trim() === "") errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const result = await fetchJson(apiRoutes.users.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, password }),
      });
      setMessage(getResponseMessage(result, DEFAULT_ERROR_MESSAGE));

      if (result.success === true) {
        setError(false);
        setValidationErrors({});
        router.push(SIGNIN_URL);
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
          <h4>Create account</h4>
          <p>Join Fashionova — it&apos;s free</p>
        </div>

        {message ? (
          <Note color={error ? "danger" : "green"}>{message}</Note>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div className="p-signin__field">
            <CustomInput
              type="text"
              label="Full name"
              name="name"
              handleChange={(e: any) => setName(e.target.value)}
              value={name}
            />
            {validationErrors.name && (
              <Note color="danger">{validationErrors.name}</Note>
            )}
          </div>

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
            <CustomInput
              type="tel"
              label="Phone number"
              name="phone"
              handleChange={(e: any) => setPhone(e.target.value)}
              value={phone}
            />
          </div>

          <div className="p-signin__field">
            <div className="p-signin__passoword-input">
              <CustomInput
                type="password"
                label="Password"
                name="password"
                handleChange={(e: any) => setPassword(e.target.value)}
                value={password}
              />
              {validationErrors.password && (
                <Note color="danger">{validationErrors.password}</Note>
              )}
            </div>
          </div>

          <div className="p-signin__submit">
            <Button type="primary" isDisabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </Button>
          </div>
        </form>

        <div className="p-signin__footer">
          Already have an account? <Link href={SIGNIN_URL}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
