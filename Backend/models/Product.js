// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      public_id: String, // Cloudinary public_id
      url: String, // Cloudinary URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
