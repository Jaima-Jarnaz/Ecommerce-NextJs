import headphone from "../public/headphone.jpeg";
import camera from "../public/camera.jpg";
import beautyProduct from "assets/beauty.webp";
import desktops from "assets/computers.jpg";
import phones from "assets/mobile.jpeg";
import bags from "assets/bags.jpeg";
import watches from "assets/watches.jpeg";
import apples from "assets/apple-products.jpeg";
import emptyCart from "assets/empty-cart.png";
import bkash from "assets/bkash.svg";
import cod from "assets/cod.png";
import payment from "assets/payment.png";
import visaPayment from "assets/credit-card.png";
import sony from "assets/logo/sony.png";
import apple from "assets/logo/apple.png";
import huawei from "assets/logo/huawei.png";
import samsung from "assets/logo/samsung.png";
import xiomi from "assets/logo/xiomi.png";
import asus from "assets/logo/asus.png";
import google from "assets/logo/google.png";
import close from "assets/icons/cross.svg";

export const IMAGES_DATA = {
  bkash,
  cod,
  payment,
  visaPayment,
  close,
};

export const EMPTY_CART_IMAGE = emptyCart;

export const IMAGES = [
  { img: apples, title: "Apple products" },
  { img: beautyProduct, title: "Beauty Product" },
  { img: desktops, title: "Desktops" },
  { img: bags, title: "Bags" },
  { img: watches, title: "Watches" },
  { img: phones, title: "Phones" },
];

export const IMAGES_BRANDS = [
  { img: sony, alt: "Sony" },
  { img: samsung, alt: "Samsung" },
  { img: apple, alt: "Apple" },
  { img: asus, alt: "asus" },

  { img: xiomi, alt: "Xiomi" },
  { img: huawei, alt: "huawei" },
  { img: google, alt: "google" },
];

export const PRODUCT_DATA = [
  {
    src: headphone,
    title: "Headphone",
    description: "Good product",
  },
  {
    src: camera,
    title: "Headphone",
    description: "Good product",
  },
  {
    src: headphone,
    title: "Headphone",
    description: "Good product",
  },
  {
    src: camera,
    title: "Headphone",
    description: "Good product",
  },
  {
    src: headphone,
    title: "Headphone",
    description: "Good product",
  },
  {
    src: camera,
    title: "Headphone",
    description: "Good product",
  },
  {
    src: headphone,
    title: "Headphone",
    description: "Good product",
  },
];

export const STATIC_TEXTS = {
  product_created_success: "Successfully added new product information",
  product_created_fail: "Sorry! something went wrong",
};
