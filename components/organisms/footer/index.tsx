import Text from "../../atoms/text";
import Icon from "@/components/atoms/icon";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="o-footer">
      <div className="o-footer__contents">
        <div className="o-footer__contents-item">
          <h6 className="o-footer__title">Stay Connected</h6>
          <div className="o-footer__text-contents">
            <p>Fashionava</p>
            <p>Shop-2,2nd floor, Kazi Tower, Dhanmundi-27, Dhaka 1212</p>
            <p>Email : fasionava@gmail.com</p>
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

        <div className="o-footer__contents-item">
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
        © 2023 Thanks From Fasionava™. | All rights reserved by Jaima Jarnaz
      </Text>
    </footer>
  );
};

export default Footer;
