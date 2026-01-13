import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import {
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-linear-to-r from-white to-blue-50 shadow-lg border-b border-blue-100">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-md">
                <HiOutlineHome className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  ShopEasy
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  Premium Shopping
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 font-medium transition-all duration-300 group">
              <span className="relative">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            <Link
              to="/products"
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 font-medium transition-all duration-300 group">
              <span className="relative">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 font-medium transition-all duration-300 group">
                <span className="relative">
                  Admin
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            )}
            <Link
              to="/orders"
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 font-medium transition-all duration-300 group">
              <span className="relative">
                Orders
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-blue-50 transition-colors duration-300 group">
              <div className="relative">
                <FiShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-linear-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-bounce">
                    {items.length}
                  </span>
                )}
              </div>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-3 bg-linear-to-r from-blue-50 to-white px-4 py-2 rounded-xl border border-blue-100">
                  <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-sm">
                      {user.name?.charAt(0) || user.email?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    {/* Email/Name without link - Sirf text */}
                    <span className="text-gray-800 font-semibold">
                      {user.name || user.email}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {user.role || "User"}
                    </span>
                  </div>

                  {/* Profile Icon with Link - Yeh add kiya hai */}

                  <FiChevronDown className="h-4 w-4 text-gray-500" />
                </div>
                <Link
                  to="/profile"
                  className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-300 group/profile">
                  <FiUser className="h-5 w-5 text-gray-600 group-hover/profile:text-blue-600 transition-colors duration-300" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-white hover:bg-linear-to-r hover:from-red-500 hover:to-red-600 border border-red-200 hover:border-transparent transition-all duration-300 group">
                  <FiLogOut className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="font-medium hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-blue-600 border border-blue-300 rounded-xl hover:bg-linear-to-r hover:from-blue-50 hover:to-white hover:border-blue-400 hover:shadow-md transition-all duration-300 font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-medium shadow-md">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
