import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyOrders } from "../../redux/slices/orderSlice";
import Navbar from "../../components/Layout/Navbar";
import Loader from "../../components/UI/Loader";
import { FiPackage, FiClock, FiCheckCircle, FiTruck } from "react-icons/fi";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <FiCheckCircle className="text-green-500" />;
      case "shipped":
        return <FiTruck className="text-blue-500" />;
      case "processing":
        return <FiClock className="text-yellow-500" />;
      default:
        return <FiPackage className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">
            View your order history and track shipments
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <FiPackage className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't placed any orders yet
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b font-medium text-gray-700">
              <div className="col-span-3">Order ID</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Total</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Payment</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Orders List */}
            {orders.map((order) => (
              <div key={order._id} className="border-b last:border-b-0">
                <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Order ID */}
                  <div className="col-span-3">
                    <p className="font-medium text-sm md:text-base">
                      #{order._id.slice(-8)}
                    </p>
                    <p className="text-xs text-gray-500 md:hidden">Order ID</p>
                  </div>

                  {/* Date */}
                  <div className="col-span-2">
                    <p className="text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500 md:hidden">Date</p>
                  </div>

                  {/* Total */}
                  <div className="col-span-2">
                    <p className="font-medium">
                      ${order.totalPrice?.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 md:hidden">Total</p>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span
                        className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                          order.status
                        )}`}>
                        {order.status || "Pending"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 md:hidden">Status</p>
                  </div>

                  {/* Payment */}
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.isPaid
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {order.isPaid ? "Paid" : "Not Paid"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 md:hidden">Payment</p>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1">
                    <Link
                      to={`/order/${order._id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View
                    </Link>
                  </div>
                </div>

                {/* Mobile View Details */}
                <div className="md:hidden p-4 bg-gray-50 border-t">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Items:</span>
                      <span className="ml-2">
                        {order.orderItems?.length || 0}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Payment:</span>
                      <span className="ml-2">{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {orders.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-700 mb-2">Total Orders</h3>
              <p className="text-3xl font-bold text-blue-600">
                {orders.length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-700 mb-2">Total Spent</h3>
              <p className="text-3xl font-bold text-green-600">
                $
                {orders
                  .reduce((total, order) => total + order.totalPrice, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-700 mb-2">Average Order</h3>
              <p className="text-3xl font-bold text-purple-600">
                $
                {(
                  orders.reduce((total, order) => total + order.totalPrice, 0) /
                    orders.length || 0
                ).toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
