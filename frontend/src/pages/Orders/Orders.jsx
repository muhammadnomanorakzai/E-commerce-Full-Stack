import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyOrders } from "../../redux/slices/orderSlice";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import Loader from "../../components/UI/Loader";
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiChevronRight } from "react-icons/fi";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <FiCheckCircle className="text-emerald-500 w-5 h-5" />;
      case "shipped":
        return <FiTruck className="text-blue-500 w-5 h-5" />;
      case "processing":
        return <FiClock className="text-amber-500 w-5 h-5" />;
      default:
        return <FiPackage className="text-slate-400 w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
      case "shipped":
        return "bg-blue-50 text-blue-700 ring-blue-600/20";
      case "processing":
        return "bg-amber-50 text-amber-700 ring-amber-600/20";
      default:
        return "bg-slate-50 text-slate-700 ring-slate-600/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16 flex justify-center items-center">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Order History</h1>
          <p className="text-slate-500 font-medium">
            View your recent orders and track active shipments.
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center max-w-2xl mx-auto mt-8">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiPackage className="text-slate-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              No orders yet
            </h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start exploring our collection and find something you love.
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="bg-white text-sm sm:text-base rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Table Header (Desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-slate-50/50 border-b border-slate-100 font-bold text-slate-700 text-xs tracking-wider uppercase">
              <div className="col-span-3">Order Details</div>
              <div className="col-span-2">Date Placed</div>
              <div className="col-span-2">Total Amount</div>
              <div className="col-span-2">Fulfillment</div>
              <div className="col-span-2">Payment</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {/* Orders List */}
            <div className="divide-y divide-slate-100">
              {orders.map((order) => (
                <div key={order._id} className="group hover:bg-slate-50/50 transition-colors">
                  <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 items-center">
                    {/* Order ID & Mobile Header */}
                    <div className="col-span-12 md:col-span-3 flex justify-between items-center md:block">
                      <div>
                        <p className="font-bold text-slate-900 font-mono text-sm md:text-base">
                          {order._id.slice(-8).toUpperCase()}
                        </p>
                        <p className="text-xs font-medium text-slate-500 mt-0.5 md:hidden">Items: {order.orderItems?.length || 0}</p>
                      </div>
                      <Link
                        to={`/order/${order._id}`}
                        className="md:hidden flex items-center text-blue-600 text-sm font-semibold bg-blue-50 px-3 py-1.5 rounded-lg">
                        View <FiChevronRight className="ml-1" />
                      </Link>
                    </div>

                    {/* Date */}
                    <div className="col-span-6 md:col-span-2">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide md:hidden mb-1">Date</p>
                      <p className="text-slate-700 font-medium">
                        {new Date(order.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    {/* Total */}
                    <div className="col-span-6 md:col-span-2">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide md:hidden mb-1">Total</p>
                      <p className="font-bold text-slate-900">
                        ${order.totalPrice?.toFixed(2)}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="col-span-6 md:col-span-2">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide md:hidden mb-1">Status</p>
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span
                          className={`ml-2 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md ring-1 ring-inset ${getStatusColor(
                            order.status
                          )}`}>
                          {order.status || "Pending"}
                        </span>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="col-span-6 md:col-span-2">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide md:hidden mb-1">Payment</p>
                      <div className="flex items-center">
                        <span
                          className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md ring-1 ring-inset ${
                            order.isPaid
                              ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                              : "bg-red-50 text-red-700 ring-red-600/20"
                          }`}>
                          {order.isPaid ? "Paid" : "Pending"}
                        </span>
                      </div>
                    </div>

                    {/* Actions (Desktop) */}
                    <div className="hidden md:flex col-span-1 justify-end">
                      <Link
                        to={`/order/${order._id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-bold bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        {orders.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <FiPackage className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-500 text-sm uppercase tracking-wide mb-1">Total Orders</h3>
              <p className="text-3xl font-extrabold text-slate-900">
                {orders.length}
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <FiCheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-500 text-sm uppercase tracking-wide mb-1">Total Spent</h3>
              <p className="text-3xl font-extrabold text-emerald-600">
                $
                {orders
                  .reduce((total, order) => total + order.totalPrice, 0)
                  .toFixed(2)}
              </p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 flex flex-col justify-center items-center text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                <FiTruck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-500 text-sm uppercase tracking-wide mb-1">Average Order</h3>
              <p className="text-3xl font-extrabold text-slate-900">
                $
                {(
                  orders.reduce((total, order) => total + order.totalPrice, 0) /
                    orders.length || 0
                ).toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
