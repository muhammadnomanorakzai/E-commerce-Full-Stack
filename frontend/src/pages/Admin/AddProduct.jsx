// AddProduct.jsx - Updated with File Upload
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/slices/adminSlice";
import Navbar from "../../components/Layout/Navbar";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Loader from "../../components/UI/Loader";
import { FiArrowLeft, FiUpload, FiPackage, FiX, FiImage } from "react-icons/fi";
import toast from "react-hot-toast";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPG, PNG, etc.)");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview("");
    setUploadProgress(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.price || !formData.stock) {
      toast.error("Please fill in required fields");
      return;
    }

    // Check if admin
    if (user?.role !== "admin") {
      toast.error("Only admin can add products");
      return;
    }

    try {
      setUploading(true);

      // Create FormData for file upload
      const productFormData = new FormData();

      // Add form data
      productFormData.append("name", formData.name);
      productFormData.append("description", formData.description);
      productFormData.append("price", formData.price);
      productFormData.append("stock", formData.stock);
      productFormData.append("category", formData.category);

      // Add image if selected
      if (image) {
        productFormData.append("image", image);
      }

      // Dispatch action with FormData
      const result = await dispatch(createProduct(productFormData)).unwrap();

      if (result) {
        toast.success("Product added successfully!");
        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
        });
        removeImage();
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error || "Failed to add product");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleBack = () => {
    navigate("/admin");
  };

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Sports",
    "Beauty",
    "Toys & Games",
    "Automotive",
    "Health",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Add New Product
              </h1>
              <p className="text-gray-600">Add a new product to your store</p>
            </div>
            <button
              onClick={handleBack}
              className="flex items-center text-blue-600 hover:text-blue-800">
              <FiArrowLeft className="mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Product Name */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Product Name *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter product name"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description"
                  required
                />
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Stock Quantity *
                  </label>
                  <Input
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 100"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Product Image
                </label>

                {/* Upload Area */}
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <FiUpload className="mx-auto text-gray-400 text-4xl mb-3" />
                      <p className="text-gray-600 font-medium">
                        Click to upload image
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        JPG, PNG, GIF up to 5MB
                      </p>
                      <Button type="button" variant="outline" className="mt-4">
                        Choose File
                      </Button>
                    </label>
                  </div>
                ) : (
                  /* Image Preview */
                  <div className="relative">
                    <div className="border rounded-lg overflow-hidden">
                      <img src={product.image?.url} alt={product.name} />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                      <FiX />
                    </button>

                    {/* Upload Progress */}
                    {uploading && uploadProgress > 0 && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Uploading: {uploadProgress}%
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleBack}
                  className="flex-1">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || uploading}
                  className="flex-1">
                  {loading || uploading ? (
                    <>
                      <Loader size="sm" className="mr-2" />
                      {uploading ? "Uploading..." : "Adding..."}
                    </>
                  ) : (
                    "Add Product"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
