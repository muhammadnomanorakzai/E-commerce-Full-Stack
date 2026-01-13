const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    res.json({ message: "welcome dashboard" });
  }
);

router.get(
  "/user",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const user = await User.find().select("-password");
      if (!user) {
        res.status(404).json({ message: "user not found" });
      }
      res.status(200).json({ message: "all users", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.put(
  "/user/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const { role } = req.body;
      const userId = req.params.id;

      if (!["admin", "user"].includes(role)) {
        return res.status(404).json({ message: "invaid role" });
      }
      const user = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      ).select("-password");

      if (!user) {
        res.status(404).json({ message: "user not found" });
      }
      res.json({ message: "user role scuccessfully updated", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/user/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        return res.status.json({ message: "user not found" });
      }
      res.status(200).json({ message: "user deleted successfully", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
