import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { FiUser, FiMail, FiCalendar, FiEdit, FiSave, FiPackage, FiShoppingBag, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
  });

  // User's orders
  const userOrders = orders.filter((order) => order.user?._id === user?.id);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Here you would call API to update user
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      username: user?.username || "",
    });
    setIsEditing(false);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                My Profile
              </h1>
              <p className="text-slate-500 font-medium">
                Manage your account information and preferences.
              </p>
            </div>
            {/* Quick stats on mobile could go here, or just keep it simple */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info & Stats */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Personal Info Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold uppercase">
                      {user.name ? user.name.charAt(0) : user.username ? user.username.charAt(0) : 'U'}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        Personal Information
                      </h2>
                      <p className="text-slate-500 text-sm font-medium">Update your details</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center px-5 py-2.5 rounded-xl font-bold transition-colors text-sm ${
                      isEditing
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}>
                    {isEditing ? (
                      <>
                        <FiSave className="mr-2" /> Cancel
                      </>
                    ) : (
                      <>
                        <FiEdit className="mr-2" /> Edit Profile
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="flex items-center text-slate-700 text-sm font-bold mb-2">
                        <FiUser className="mr-2 text-slate-400" />
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-slate-900 font-medium"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 font-medium">
                          {user.name || "Not set"}
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center text-slate-700 text-sm font-bold mb-2">
                        <FiMail className="mr-2 text-slate-400" />
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-slate-900 font-medium"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 font-medium">
                          {user.email}
                        </div>
                      )}
                    </div>

                    {/* Username */}
                    <div>
                      <label className="flex items-center text-slate-700 text-sm font-bold mb-2">
                        <FiUser className="mr-2 text-slate-400" />
                        Username
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Enter username"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-slate-900 font-medium"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 font-medium">
                          @{user.username || "No username"}
                        </div>
                      )}
                    </div>

                    {/* Role */}
                    <div>
                      <label className="flex items-center text-slate-700 text-sm font-bold mb-2">
                        <FiCalendar className="mr-2 text-slate-400" />
                        Account Type
                      </label>
                      <div className="px-4 py-3">
                        <span
                          className={`px-3 py-1 text-sm font-bold tracking-wide uppercase rounded-md ring-1 ring-inset ${
                            user.role === "admin"
                              ? "bg-red-50 text-red-700 ring-red-600/20"
                              : "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                          }`}>
                          {user.role === "admin" ? "Administrator" : "Regular User"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons (when editing) */}
                  {isEditing && (
                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
                      <button
                        onClick={handleCancel}
                        className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors">
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Stats */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <FiShoppingBag className="mr-3 text-blue-600" />
                  Order Statistics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-3xl font-extrabold text-blue-600 mb-1">
                      {userOrders.length}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Orders</p>
                  </div>
                  <div className="text-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-3xl font-extrabold text-emerald-500 mb-1">
                      {
                        userOrders.filter((o) => o.status === "delivered")
                          .length
                      }
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Completed</p>
                  </div>
                  <div className="text-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-3xl font-extrabold text-amber-500 mb-1">
                      {userOrders.filter((o) => o.status === "pending").length}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pending</p>
                  </div>
                  <div className="text-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-3xl font-extrabold text-indigo-600 mb-1">
                      $
                      {userOrders
                        .reduce(
                          (sum, order) => sum + (order.totalPrice || 0),
                          0
                        )
                        .toFixed(2)}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Spent</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 sticky top-28">
                <h2 className="text-xl font-bold text-slate-900 mb-6">
                  Quick Actions
                </h2>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold transition-all group">
                    <span className="flex items-center">
                      <FiPackage className="mr-3 text-slate-400 group-hover:text-blue-500" />
                      View My Orders
                    </span>
                    <span className="text-slate-300 group-hover:text-blue-400">→</span>
                  </button>

                  <button
                    onClick={() => navigate("/cart")}
                    className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold transition-all group">
                    <span className="flex items-center">
                      <FiShoppingBag className="mr-3 text-slate-400 group-hover:text-blue-500" />
                      Go to Cart
                    </span>
                    <span className="text-slate-300 group-hover:text-blue-400">→</span>
                  </button>

                  <button
                    onClick={() => navigate("/products")}
                    className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold transition-all group">
                    <span className="flex items-center">
                      <FiCheckCircle className="mr-3 text-slate-400 group-hover:text-blue-500" />
                      Continue Shopping
                    </span>
                    <span className="text-slate-300 group-hover:text-blue-400">→</span>
                  </button>

                  {user.role === "admin" && (
                    <button
                      onClick={() => navigate("/admin")}
                      className="w-full mt-4 p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors text-center shadow-lg shadow-slate-900/20">
                      Admin Dashboard
                    </button>
                  )}
                </div>

                {/* Account Info */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-4">
                    Account Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Member since</span>
                      <span className="font-semibold text-slate-700">
                        {new Date(
                          user.createdAt || Date.now()
                        ).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Last login</span>
                      <span className="font-semibold text-slate-700">Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
