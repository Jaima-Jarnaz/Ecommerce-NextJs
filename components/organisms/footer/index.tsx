import Heading from "@/components/atoms/heading";
import Text from "../../atoms/text";
import Icon from "@/components/atoms/icon";
import Link from "next/link";
import CustomInput from "@/components/atoms/custom-input";
import Button from "@/components/atoms/button";
import { Note } from "@/components/atoms/note/index.";
import apiRoutes from "helpers/apiRoutes";
import {
  DEFAULT_ERROR_MESSAGE,
  fetchJson,
  getErrorMessage,
  getResponseMessage,
} from "helpers/apiClient";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === "") {
      setError(true);
      setMessage("Email is required");
      return;
    }

    setLoading(true);
    try {
      const result = await fetchJson(apiRoutes.subscriptions.subscribe, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      setMessage(getResponseMessage(result, DEFAULT_ERROR_MESSAGE));

      if (result.success === true) {
        setError(false);
        setEmail("");
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
    <footer className="o-footer">
      <div className="o-footer__subscription-container">
        <div className="o-footer__subscription-content">
          <Heading tag="h4">GET THE LATEST UPDATES</Heading>
          <form onSubmit={handleSubscribe}>
            {message ? (
              <Note color={error ? "danger" : "green"}>{message}</Note>
            ) : null}
            <div className="o-footer__subscription-email">
              <CustomInput
                padding="padding-12"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <Button type="primary" isDisabled={loading}>
                {loading ? "Submitting…" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="o-footer__main">
        <div className="o-footer__contents">
          <div className="o-footer__contents-item">
            <h6 className="o-footer__title">Stay Connected</h6>
            <div className="o-footer__text-contents">
              <p>Fashionova</p>
              <p>Shop-2, 2nd floor, Kazi Tower, Dhanmundi-27, Dhaka 1212</p>
              <p>Email: fashionova@gmail.com</p>
            </div>
          </div>
          <div className="o-footer__contents-item">
            <h6 className="o-footer__title">About Us</h6>
            <div className="o-footer__text-contents">
              <p>Blog</p>
              <p>Careers</p>
              <p>Join Our Community</p>
              <p>Order Tracking</p>
            </div>
          </div>
          <div className="o-footer__contents-item">
            <h6 className="o-footer__title">Help</h6>
            <div className="o-footer__text-contents">
              <Link href="#">
                <p>EMI Policy</p>
              </Link>
              <Link href="#">
                <p>Refund Policy</p>
              </Link>
              <Link href="#">
                <p>Warranty Policy</p>
              </Link>
              <Link href="#">
                <p>Privacy Policy</p>
              </Link>
              <Link href="#">
                <p>Complain Policy</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="o-footer__support">
          <h6 className="o-footer__title">Support</h6>
          <div className="o-footer__button-container">
            <button className="o-footer__button" type="button">
              <Icon iconName="call" />
              01999423423499
            </button>
            <button className="o-footer__button" type="button">
              <Icon iconName="location" />
              Find Our Stores
            </button>
          </div>
        </div>
      </div>
      <Text>
        © 2023 Thanks From Fashionova™. | All rights reserved.
      </Text>
    </footer>
  );
};

export default Footer;
