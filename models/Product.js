import mongoose, { models } from "mongoose";

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: Object,
    required: true,
  },
});

export default mongoose.models.product ||
  mongoose.model("product", productsSchema);
