import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchOrderById, clearOrderState } from "../../redux/slices/orderSlice";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import Loader from "../../components/UI/Loader";
import { FiCheckCircle, FiPackage, FiTruck, FiHome } from "react-icons/fi";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { currentOrder, loading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }

    return () => {
      dispatch(clearOrderState());
    };
  }, [dispatch, orderId]);

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

  if (!currentOrder) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center max-w-lg w-full">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Order Not Found
            </h1>
            <p className="text-slate-600 mb-8">
              The order you're looking for doesn't exist or you don't have permission to view it.
            </p>
            <Link
              to="/orders"
              className="inline-block w-full px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
              View My Orders
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Success Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 mb-8 text-center max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="text-emerald-500 text-4xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-slate-600 text-lg mb-6">
            Thank you for your purchase, <span className="font-semibold text-slate-900">{user?.name}</span>!
          </p>
          <div className="inline-block bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700">
            Order ID: <span className="font-bold font-mono">{currentOrder._id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Order Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                Order Details
              </h2>

              {/* Order Items */}
              <div className="mb-8">
                <h3 className="font-semibold text-slate-700 mb-4 tracking-wide uppercase text-xs">
                  Items Ordered
                </h3>
                <div className="space-y-4">
                  {currentOrder.orderItems?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl mr-4 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {/* Product image would go here */}
                          <span className="text-slate-300 text-xs font-medium">Img</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{item.name}</p>
                          <p className="text-sm text-slate-500 font-medium">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Shipping Info */}
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                      <FiTruck className="text-blue-600 w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900">
                      Shipping Info
                    </h3>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm">
                    <p className="font-semibold text-slate-900 mb-1">
                      {currentOrder.shippingAddress?.address}
                    </p>
                    <p className="text-slate-600">
                      {currentOrder.shippingAddress?.city},{" "}
                      {currentOrder.shippingAddress?.postalCode}
                    </p>
                    <p className="text-slate-600">
                      {currentOrder.shippingAddress?.country}
                    </p>
                  </div>
                </div>

                {/* Payment Info */}
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center mr-3">
                      <FiPackage className="text-indigo-600 w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900">
                      Order Status
                    </h3>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">Method:</span>
                      <span className="font-bold text-slate-900">
                        {currentOrder.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">Fulfillment:</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded-md text-xs uppercase tracking-wider ${
                          currentOrder.status === "delivered"
                            ? "bg-emerald-100 text-emerald-800"
                            : currentOrder.status === "processing"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                        {currentOrder.status || "Pending"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Payment:</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded-md text-xs uppercase tracking-wider ${
                          currentOrder.isPaid ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                        }`}>
                        {currentOrder.isPaid ? "Paid" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 sticky top-28">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Total Summary
              </h2>

              <div className="space-y-4 mb-6 text-sm font-medium text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-semibold">
                    ${currentOrder.totalPrice?.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-slate-900 font-semibold">$5.00</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span className="text-slate-900 font-semibold">
                    ${(currentOrder.totalPrice * 0.1).toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-2">
                  <div className="flex justify-between text-lg items-center">
                    <span className="font-bold text-slate-900">Total Paid</span>
                    <span className="font-extrabold text-blue-600 text-2xl tracking-tight">
                      $
                      {(
                        currentOrder.totalPrice +
                        5 +
                        currentOrder.totalPrice * 0.1
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 mt-8">
                <Link
                  to="/orders"
                  className="block w-full py-3.5 text-center bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm">
                  Track Order
                </Link>

                <Link
                  to="/products"
                  className="block w-full py-3.5 text-center bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors">
                  Continue Shopping
                </Link>
                
                <div className="pt-4 mt-4 border-t border-slate-100 text-center">
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("Invoice download placeholder"); }} className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                    Download PDF Invoice
                  </a>
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

export default OrderConfirmation;
