import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";
import { FiPackage, FiShoppingBag, FiTruck, FiShield } from "react-icons/fi";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome{user?.name ? `, ${user.name}` : ""} to ShopEasy
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Your one-stop destination for quality products at amazing prices.
            </p>
            <div className="flex space-x-4 gap-7">
              <Link
                to="/products"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100">
                Shop Now
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600">
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose ShopEasy?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPackage className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600">
              Thousands of products across multiple categories
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShoppingBag className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Shopping</h3>
            <p className="text-gray-600">
              Simple, intuitive interface for seamless shopping
            </p>
          </div>

          <div className="text-center">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTruck className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Quick shipping with real-time tracking
            </p>
          </div>

          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShield className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">
              100% secure payment with multiple options
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats for Admin */}
      {user?.role === "admin" && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-2xl font-bold mb-6">Admin Quick Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">
                  Total Products
                </h4>
                <p className="text-3xl font-bold text-blue-600">0</p>
                <p className="text-sm text-gray-600 mt-2">
                  Add products in admin panel
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-700 mb-2">
                  Total Orders
                </h4>
                <p className="text-3xl font-bold text-green-600">0</p>
                <p className="text-sm text-gray-600 mt-2">No orders yet</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-700 mb-2">
                  Total Users
                </h4>
                <p className="text-3xl font-bold text-purple-600">1</p>
                <p className="text-sm text-gray-600 mt-2">
                  You are the first user!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p>&copy; 2024 ShopEasy. All rights reserved.</p>
            <p className="mt-2 text-gray-400">
              Built with React, Node.js, and MongoDB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
