import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiEye, FiStar } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent navigating if wrapped in a link
    try {
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

  // Mock rating for visual purpose since API might not have it yet
  const rating = product.rating || 4.5;
  const reviews = product.numReviews || Math.floor(Math.random() * 100) + 10;

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover-lift flex flex-col h-full">
      {/* Product Image */}
      <Link to={`/products/${product._id}`} className="relative h-56 bg-slate-50 flex items-center justify-center overflow-hidden block">
        {product.image?.url ? (
          <img
            src={product.image.url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="text-slate-400 font-medium">No Image Available</div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.inStock <= 0 ? (
            <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold tracking-wider rounded-md uppercase shadow-sm">
              Out of Stock
            </span>
          ) : product.inStock < 5 ? (
            <span className="px-2.5 py-1 bg-orange-500 text-white text-[10px] font-bold tracking-wider rounded-md uppercase shadow-sm">
              Low Stock
            </span>
          ) : null}
        </div>
        
        {/* Quick View Hover Button */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <span className="bg-white text-slate-900 h-10 w-10 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 hover:text-white transition-colors">
              <FiEye className="w-5 h-5" />
            </span>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">
            {product.category || "General"}
          </span>
          {/* Static Stars */}
          <div className="flex items-center space-x-1 bg-slate-50 px-1.5 py-0.5 rounded-md">
            <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-bold text-slate-700">{rating}</span>
            <span className="text-[10px] text-slate-400">({reviews})</span>
          </div>
        </div>

        <Link to={`/products/${product._id}`} className="block mb-1 mt-1">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
          {product.description || "Premium quality product designed to meet your everyday needs."}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 line-through mb-0.5">
              ${(product.price * 1.2).toFixed(2)}
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.inStock <= 0}
            className={`flex items-center justify-center h-10 w-10 sm:w-auto sm:px-4 rounded-xl transition-all duration-300 cursor-pointer ${
              product.inStock > 0
                ? "bg-red-900 text-white hover:bg-blue-600 shadow-sm hover:shadow-blue-600/30 active:scale-95"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}>
            <FiShoppingCart className="w-5 h-5 sm:mr-2" />
            <span className="hidden sm:inline font-medium text-sm cursor-pointer">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
