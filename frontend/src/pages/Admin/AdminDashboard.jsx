import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllUsers,
  fetchAllOrders,
  deleteProduct,
  updateOrderStatus,
  updateUserRole,
  deleteUser,
} from "../../redux/slices/adminSlice";
import { fetchProducts } from "../../redux/slices/productSlice";
import Navbar from "../../components/Layout/Navbar";
import Loader from "../../components/UI/Loader";
import {
  FiUsers,
  FiPackage,
  FiShoppingBag,
  FiDollarSign,
  FiEdit,
  FiTrash2,
  FiEye,
  FiSearch,
  FiX,
  FiFilter,
} from "react-icons/fi";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { users, orders, loading } = useSelector((state) => state.admin);
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  // Tabs state
  const [activeTab, setActiveTab] = useState("overview");

  // Products search/filter states
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("");
  const [productStockFilter, setProductStockFilter] = useState("");

  // Orders search/filter states
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("");

  // Users search/filter states
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("");

  // Filter products
  const filteredProducts = products.filter((product) => {
    const searchLower = productSearch.toLowerCase();
    const matchesSearch =
      productSearch === "" ||
      product.name?.toLowerCase().includes(searchLower) ||
      product.description?.toLowerCase().includes(searchLower) ||
      product.category?.toLowerCase().includes(searchLower);

    const matchesCategory =
      productCategoryFilter === "" ||
      product.category === productCategoryFilter;

    const matchesStock =
      productStockFilter === "" ||
      (productStockFilter === "out" && product.inStock === 0) ||
      (productStockFilter === "low" &&
        product.inStock > 0 &&
        product.inStock < 10) ||
      (productStockFilter === "high" && product.inStock >= 10);

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const searchLower = orderSearch.toLowerCase();
    const matchesSearch =
      orderSearch === "" ||
      order._id?.toLowerCase().includes(searchLower) ||
      order.user?.name?.toLowerCase().includes(searchLower) ||
      order.user?.email?.toLowerCase().includes(searchLower) ||
      order.status?.toLowerCase().includes(searchLower);

    const matchesStatus =
      orderStatusFilter === "" || order.status === orderStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filter users
  const filteredUsers = users.filter((userItem) => {
    const searchLower = userSearch.toLowerCase();
    const matchesSearch =
      userSearch === "" ||
      userItem.name?.toLowerCase().includes(searchLower) ||
      userItem.email?.toLowerCase().includes(searchLower) ||
      userItem.username?.toLowerCase().includes(searchLower);

    const matchesRole =
      userRoleFilter === "" || userItem.role === userRoleFilter;

    return matchesSearch && matchesRole;
  });

  // Get unique categories from products
  const productCategories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(fetchAllUsers());
      dispatch(fetchAllOrders());
      dispatch(fetchProducts());
    }
  }, [dispatch, user]);

  // User management functions
  const handleUpdateUserRole = async (userId, newRole) => {
    if (!window.confirm(`Change user role to ${newRole}?`)) {
      return;
    }

    try {
      await dispatch(updateUserRole({ userId, role: newRole })).unwrap();
      toast.success("User role updated successfully");
      dispatch(fetchAllUsers());
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (
      !window.confirm(`Are you sure you want to delete user "${userName}"?`)
    ) {
      return;
    }

    try {
      await dispatch(deleteUser(userId)).unwrap();
      toast.success("User deleted successfully");
      dispatch(fetchAllUsers());
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  // Product management functions
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await dispatch(deleteProduct(productId)).unwrap();
      toast.success("Product deleted successfully");
      dispatch(fetchProducts());
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // Order management functions
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await dispatch(
        updateOrderStatus({ orderId, status: newStatus })
      ).unwrap();
      toast.success("Order status updated");
      dispatch(fetchAllOrders());
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setProductSearch("");
    setProductCategoryFilter("");
    setProductStockFilter("");
    setOrderSearch("");
    setOrderStatusFilter("");
    setUserSearch("");
    setUserRoleFilter("");
  };

  if (loading) {
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

  // Calculate stats
  const stats = {
    totalUsers: users.length,
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce(
      (sum, order) => sum + (order.totalPrice || 0),
      0
    ),
    pendingOrders: orders.filter((order) => order.status === "pending").length,
    completedOrders: orders.filter((order) => order.status === "delivered")
      .length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <FiUsers className="text-blue-600 text-2xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <FiPackage className="text-green-600 text-2xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalProducts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <FiShoppingBag className="text-purple-600 text-2xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalOrders}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                <FiDollarSign className="text-yellow-600 text-2xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">
                  ${stats.totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}>
              Overview
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "products"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}>
              Products ({filteredProducts.length})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "orders"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}>
              Orders ({filteredOrders.length})
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "users"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}>
              Users ({filteredUsers.length})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Quick Overview
              </h2>

              {/* Recent Orders */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Recent Orders
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            #{order._id.slice(-8)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.user?.name || order.user?.email || "Unknown"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${order.totalPrice?.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                              {order.status || "Processing"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Products */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Recent Products
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {products.slice(0, 3).map((product) => (
                    <div key={product._id} className="border rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded mr-4">
                          {product.image && (
                            <img
                              src={product.image?.url}
                              alt={product.name}
                              className="w-full h-full object-cover rounded"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {product.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            ${product.price}
                          </p>
                          <p className="text-xs text-gray-500">
                            Stock: {product.inStock}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Products Management
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {filteredProducts.length} of {products.length} products
                  </p>
                </div>
                <Link
                  to="/admin/products/add"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Add New Product
                </Link>
              </div>

              {/* Products Search and Filter Bar */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
                  {/* Search Input */}
                  <div className="flex-1">
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search products by name, description, category..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                      {productSearch && (
                        <button
                          onClick={() => setProductSearch("")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <FiX />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="flex items-center space-x-2">
                    <FiFilter className="text-gray-400" />
                    <select
                      value={productCategoryFilter}
                      onChange={(e) => setProductCategoryFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="">All Categories</option>
                      {productCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Stock Filter */}
                  <div className="flex items-center space-x-2">
                    <select
                      value={productStockFilter}
                      onChange={(e) => setProductStockFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="">All Stock</option>
                      <option value="out">Out of Stock</option>
                      <option value="low">Low Stock (&lt;10)</option>
                      <option value="high">High Stock (&gt;10)</option>
                    </select>
                  </div>

                  {/* Clear Filters Button */}
                  {(productSearch ||
                    productCategoryFilter ||
                    productStockFilter) && (
                    <button
                      onClick={() => {
                        setProductSearch("");
                        setProductCategoryFilter("");
                        setProductStockFilter("");
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              {product.image ? (
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={product.image?.url}
                                  alt={product.name}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <FiPackage className="text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {product.description || "No description"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${product.price?.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              product.inStock > 10
                                ? "bg-green-100 text-green-800"
                                : product.inStock > 0
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                            {product.inStock}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.category || "Uncategorized"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              product.inStock > 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}>
                            {product.inStock > 0 ? "Active" : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                            title="Edit">
                            <FiEdit />
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete">
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* No Products Message */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {productSearch ||
                    productCategoryFilter ||
                    productStockFilter
                      ? "Try adjusting your search or filter"
                      : "No products in the database"}
                  </p>
                  {(productSearch ||
                    productCategoryFilter ||
                    productStockFilter) && (
                    <button
                      onClick={() => {
                        setProductSearch("");
                        setProductCategoryFilter("");
                        setProductStockFilter("");
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}

              {/* Products Stats */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-700 mb-1">
                    Total Products
                  </h3>
                  <p className="text-2xl font-bold text-blue-800">
                    {products.length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-700 mb-1">In Stock</h3>
                  <p className="text-2xl font-bold text-green-800">
                    {products.filter((p) => p.inStock > 0).length}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-700 mb-1">
                    Out of Stock
                  </h3>
                  <p className="text-2xl font-bold text-red-800">
                    {products.filter((p) => p.inStock === 0).length}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-700 mb-1">
                    Low Stock (&lt;10)
                  </h3>
                  <p className="text-2xl font-bold text-yellow-800">
                    {
                      products.filter((p) => p.inStock > 0 && p.inStock < 10)
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Orders Management
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {filteredOrders.length} of {orders.length} orders
                  </p>
                </div>
              </div>

              {/* Orders Search and Filter Bar */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
                  {/* Search Input */}
                  <div className="flex-1">
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search orders by ID, customer name, email, or status..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                      {orderSearch && (
                        <button
                          onClick={() => setOrderSearch("")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <FiX />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="flex items-center space-x-2">
                    <FiFilter className="text-gray-400" />
                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Clear Filters Button */}
                  {(orderSearch || orderStatusFilter) && (
                    <button
                      onClick={() => {
                        setOrderSearch("");
                        setOrderStatusFilter("");
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          #{order._id.slice(-8)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.user?.name || order.user?.email || "Unknown"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${order.totalPrice?.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            onChange={(e) =>
                              handleUpdateOrderStatus(order._id, e.target.value)
                            }
                            className={`text-sm rounded px-2 py-1 ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                            defaultValue={order.status || "pending"}>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            to={`/order/${order._id}`}
                            className="text-blue-600 hover:text-blue-900">
                            <FiEye />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* No Orders Message */}
              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No orders found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {orderSearch || orderStatusFilter
                      ? "Try adjusting your search or filter"
                      : "No orders in the database"}
                  </p>
                  {(orderSearch || orderStatusFilter) && (
                    <button
                      onClick={() => {
                        setOrderSearch("");
                        setOrderStatusFilter("");
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}

              {/* Orders Stats */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-700 mb-1">
                    Total Orders
                  </h3>
                  <p className="text-2xl font-bold text-blue-800">
                    {orders.length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-700 mb-1">Delivered</h3>
                  <p className="text-2xl font-bold text-green-800">
                    {orders.filter((o) => o.status === "delivered").length}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-700 mb-1">Pending</h3>
                  <p className="text-2xl font-bold text-yellow-800">
                    {orders.filter((o) => o.status === "pending").length}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-700 mb-1">
                    Total Revenue
                  </h3>
                  <p className="text-2xl font-bold text-purple-800">
                    ${stats.totalRevenue.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Users Management ({users.length} users)
                </h2>
                <div className="text-sm text-gray-600">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded mr-2">
                    Admin: {users.filter((u) => u.role === "admin").length}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    User: {users.filter((u) => u.role === "user").length}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Orders
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((userItem) => (
                      <tr key={userItem._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <FiUsers className="text-gray-400" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {userItem.username || "No Name"}
                                {userItem._id === user?._id && (
                                  <span className="ml-2 text-xs text-blue-600">
                                    (You)
                                  </span>
                                )}
                              </div>
                              {/* <div className="text-sm text-gray-500">
                                {userItem.username || "no-username"}
                              </div> */}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {userItem.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={userItem.role || "user"}
                            onChange={(e) =>
                              handleUpdateUserRole(userItem._id, e.target.value)
                            }
                            disabled={userItem._id === user?._id} // Can't change own role
                            className={`text-sm rounded px-2 py-1 ${
                              userItem.role === "admin"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            } ${
                              userItem._id === user?._id
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(userItem.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {
                            orders.filter(
                              (order) => order.user?._id === userItem._id
                            ).length
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() =>
                              handleDeleteUser(userItem._id, userItem.name)
                            }
                            disabled={userItem._id === user?._id} // Can't delete yourself
                            className={`text-red-600 hover:text-red-900 ${
                              userItem._id === user?._id
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}>
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Users Stats */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-700 mb-1">
                    Total Users
                  </h3>
                  <p className="text-2xl font-bold text-blue-800">
                    {users.length}
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-700 mb-1">Admins</h3>
                  <p className="text-2xl font-bold text-red-800">
                    {users.filter((u) => u.role === "admin").length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-700 mb-1">
                    Regular Users
                  </h3>
                  <p className="text-2xl font-bold text-green-800">
                    {users.filter((u) => u.role === "user").length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
