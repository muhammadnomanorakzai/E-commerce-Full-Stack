import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct, deleteProduct } from "../../redux/slices/adminSlice";
import { fetchProductById } from "../../redux/slices/productSlice";
import Navbar from "../../components/Layout/Navbar";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Loader from "../../components/UI/Loader";
import { FiArrowLeft, FiTrash2, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const { loading: adminLoading, error } = useSelector((state) => state.admin);
  const { product, loading: productLoading } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    inStock: "",
    category: "",
    image: "",
  });

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        inStock: product.inStock || "",
        category: product.category || "",
        image: product.image || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.inStock) {
      toast.error("Please fill in required fields");
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      inStock: parseInt(formData.inStock),
    };

    try {
      const result = await dispatch(
        updateProduct({
          productId,
          productData,
        })
      ).unwrap();

      if (result) {
        toast.success("Product updated successfully!");
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error || "Failed to update product");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await dispatch(deleteProduct(productId)).unwrap();

      if (result) {
        toast.success("Product deleted successfully!");
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error || "Failed to delete product");
      setIsDeleting(false);
    }
  };

  const handleBack = () => {
    navigate("/admin");
  };

  if (productLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The product you're trying to edit doesn't exist.
            </p>
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Edit Product
              </h1>
              <p className="text-gray-600">Update product details</p>
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
            {/* Product Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-200 rounded mr-4">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Product ID</p>
                  <p className="font-medium">{product._id}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
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
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description"
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
                    name="inStock"
                    type="number"
                    value={formData.inStock}
                    onChange={handleChange}
                    required
                    placeholder="e.g., 100"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="sports">Sports</option>
                  <option value="beauty">Beauty</option>
                  <option value="toys">Toys & Games</option>
                </select>
              </div>

              {/* Image URL */}
              <div className="mb-8">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Image URL
                </label>
                <Input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enter a direct image URL. Leave empty for default image.
                </p>
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Image Preview
                  </label>
                  <div className="w-32 h-32 border rounded-lg overflow-hidden">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150?text=Invalid+URL";
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="danger"
                  onClick={handleDelete}
                  disabled={isDeleting || adminLoading}
                  className="flex-1">
                  {isDeleting ? (
                    <Loader />
                  ) : (
                    <>
                      <FiTrash2 className="inline mr-2" />
                      Delete
                    </>
                  )}
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={adminLoading}
                  className="flex-1">
                  {adminLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <FiSave className="inline mr-2" />
                      Save Changes
                    </>
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

export default EditProduct;
