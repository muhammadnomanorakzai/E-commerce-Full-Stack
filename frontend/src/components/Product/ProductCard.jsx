import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiEye } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    try {
      // Call API
      await dispatch(
        addItemToCart({
          productId: product._id,
          quantity: 1,
        })
      ).unwrap();

      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error("Add to cart error:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {product.image?.url ? (
          <img
            src={product.image.url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-gray-400">No Image</div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description || "No description available"}
        </p>

        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-blue-600">
            ${product.price}
          </span>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              product.inStock > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}>
            {product.inStock > 0
              ? `In Stock (${product.inStock})`
              : "Out of Stock"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={product.inStock <= 0}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
              product.inStock > 0
                ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                : "bg-gray-200 text-gray-500 cursor-pointer"
            }`}>
            <FiShoppingCart className="mr-2" />
            Add to cart
          </button>

          <Link
            to={`/products/${product._id}`}
            className="flex items-center justify-center py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 cursor-pointer">
            <FiEye />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
