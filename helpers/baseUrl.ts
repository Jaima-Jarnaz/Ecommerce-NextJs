const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://ecommerce-next-js-sigma.vercel.app"
    : "http://localhost:4000";
export default baseUrl;
