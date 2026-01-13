const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Public
router.get("/", getAllCategories);

// Admin
router.post("/", authMiddleware, roleMiddleware("admin"), createCategory);

router.put("/:id", authMiddleware, roleMiddleware("admin"), updateCategory);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteCategory);

module.exports = router;
