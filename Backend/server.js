const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();
const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Base route
app.get("/", (req, res) => res.send("E-Commerce Backend Running"));
app.use("/api/auth", authRoutes); //login and register
app.use("/api/user", userRoutes); //to accesc profile only admin
app.use("/api/admin", adminUserRoutes); // admin role base crud
app.use("/api/products", productRoutes); // admin products crud ..
app.use("/api/categories", categoryRoutes); // admin category crud
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
