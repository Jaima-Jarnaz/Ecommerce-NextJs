const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://backend-api-ecommerce-l46n.onrender.com"
    : "http://localhost:4000");

export default baseUrl;
