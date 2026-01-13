const Category = require("../models/Category");

// Create category (Admin)
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      message: "Category created",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get all categories (Public)
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update category (Admin)
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.json({
      message: "Category updated",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Delete category (Admin)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
