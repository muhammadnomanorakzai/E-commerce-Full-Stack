import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { FiUser, FiMail, FiCalendar, FiEdit, FiSave } from "react-icons/fi";
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              My Profile
            </h1>
            <p className="text-gray-600">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Personal Information
                  </h2>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "secondary" : "outline"}>
                    {isEditing ? (
                      <FiSave className="mr-2" />
                    ) : (
                      <FiEdit className="mr-2" />
                    )}
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="flex items-center text-gray-700 text-sm font-bold mb-2">
                      <FiUser className="mr-2" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                      />
                    ) : (
                      <p className="text-gray-800">{user.name || "Not set"}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="flex items-center text-gray-700 text-sm font-bold mb-2">
                      <FiMail className="mr-2" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                    ) : (
                      <p className="text-gray-800">{user.email}</p>
                    )}
                  </div>

                  {/* Username */}
                  <div>
                    <label className="flex items-center text-gray-700 text-sm font-bold mb-2">
                      <FiUser className="mr-2" />
                      Username
                    </label>
                    {isEditing ? (
                      <Input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                      />
                    ) : (
                      <p className="text-gray-800">
                        @{user.username || "No username"}
                      </p>
                    )}
                  </div>

                  {/* Role */}
                  <div>
                    <label className="flex items-center text-gray-700 text-sm font-bold mb-2">
                      <FiCalendar className="mr-2" />
                      Account Type
                    </label>
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                      {user.role === "admin" ? "Administrator" : "Regular User"}
                    </span>
                  </div>

                  {/* Action Buttons (when editing) */}
                  {isEditing && (
                    <div className="flex space-x-4 pt-4">
                      <Button onClick={handleCancel} variant="secondary">
                        Cancel
                      </Button>
                      <Button onClick={handleSave} variant="primary">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Stats */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Order Statistics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {userOrders.length}
                    </p>
                    <p className="text-sm text-gray-600">Total Orders</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {
                        userOrders.filter((o) => o.status === "delivered")
                          .length
                      }
                    </p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">
                      {userOrders.filter((o) => o.status === "pending").length}
                    </p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      $
                      {userOrders
                        .reduce(
                          (sum, order) => sum + (order.totalPrice || 0),
                          0
                        )
                        .toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Quick Actions
                </h2>

                <div className="space-y-4">
                  <Button
                    onClick={() => navigate("/orders")}
                    variant="outline"
                    className="w-full justify-start">
                    View My Orders
                  </Button>

                  <Button
                    onClick={() => navigate("/cart")}
                    variant="outline"
                    className="w-full justify-start">
                    Go to Cart
                  </Button>

                  <Button
                    onClick={() => navigate("/products")}
                    variant="outline"
                    className="w-full justify-start">
                    Continue Shopping
                  </Button>

                  {user.role === "admin" && (
                    <Button
                      onClick={() => navigate("/admin")}
                      variant="primary"
                      className="w-full justify-start">
                      Admin Dashboard
                    </Button>
                  )}
                </div>

                {/* Account Info */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="font-medium text-gray-700 mb-3">
                    Account Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    Member since:{" "}
                    {new Date(
                      user.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Last login: Today
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
