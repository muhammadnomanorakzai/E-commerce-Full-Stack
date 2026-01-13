// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single product
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE product with file upload
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, price, stock, category } = req.body;

      // Create product object
      const productData = {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
      };

      // Add image data if uploaded
      if (req.file) {
        productData.image = {
          public_id: req.file.filename,
          url: req.file.path,
        };
      }

      const product = await Product.create(productData);

      res.status(201).json({
        message: "Product added successfully!",
        product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// UPDATE product with optional file upload
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, description, price, stock, category } = req.body;

      // Find existing product
      let product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price ? parseFloat(price) : product.price;
      product.stock = stock ? parseInt(stock) : product.stock;
      product.category = category || product.category;

      // Update image if new file uploaded
      if (req.file) {
        // Delete old image from Cloudinary if exists
        if (product.image && product.image.public_id) {
          const cloudinary = require("../utils/cloudinary");
          await cloudinary.uploader.destroy(product.image.public_id);
        }

        product.image = {
          public_id: req.file.filename,
          url: req.file.path,
        };
      }

      await product.save();

      res.status(200).json({
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// DELETE product
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const productId = req.params.id;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Delete image from Cloudinary if exists
      if (product.image && product.image.public_id) {
        const cloudinary = require("../utils/cloudinary");
        await cloudinary.uploader.destroy(product.image.public_id);
      }

      await Product.findByIdAndDelete(productId);

      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
