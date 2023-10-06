import Text from "../../atoms/text";
import Button from "@/components/atoms/button";
const Footer = () => {
  return (
    <footer className="o-footer">
      <div className="o-footer__contents">
        <div>
          <h6 className="o-footer__title">Stay Connected</h6>
          <div>
            <p>Fashionava</p>
            <p>Shop-2,2nd floor, Kazi Tower, Dhanmundi-27, Dhaka 1212</p>
            <p>Email : fasionava@gmail.com</p>
          </div>
        </div>

        <div>
          <h6 className="o-footer__title">About Us</h6>
          <p>Blog</p>
          <p>Careers</p>
          <p>Join Our Community</p>
          <p>Order Tracking</p>
        </div>

        <div>
          <h6 className="o-footer__title">Help</h6>
          <p>EMI Policy</p>
          <p>Refund Policy</p>
          <p>Warranty Policy</p>
          <p>Privacy Policy</p>
          <p>Complain</p>
        </div>

        <div>
          <h6 className="o-footer__title">Support</h6>
          <div>
            <Button type="primary">01999423423499</Button>
            <Button type="primary">Find Our Stores</Button>
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
