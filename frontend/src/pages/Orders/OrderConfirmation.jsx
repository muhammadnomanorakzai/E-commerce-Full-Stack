import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchOrderById, clearOrderState } from "../../redux/slices/orderSlice";
import Navbar from "../../components/Layout/Navbar";
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

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Order Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The order you're looking for doesn't exist.
            </p>
            <Link
              to="/orders"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow p-8 mb-8 text-center">
          <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase, {user?.name}!
          </p>
          <p className="text-gray-500">Order ID: {currentOrder._id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Details
              </h2>

              {/* Order Items */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-700 mb-4">
                  Items Ordered
                </h3>
                <div className="space-y-4">
                  {currentOrder.orderItems?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-gray-200 rounded mr-4">
                          {/* Product image would go here */}
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <FiTruck className="text-blue-600 mr-3" />
                  <h3 className="font-medium text-gray-700">
                    Shipping Information
                  </h3>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">
                    {currentOrder.shippingAddress?.address}
                  </p>
                  <p className="text-gray-600">
                    {currentOrder.shippingAddress?.city},{" "}
                    {currentOrder.shippingAddress?.postalCode}
                  </p>
                  <p className="text-gray-600">
                    {currentOrder.shippingAddress?.country}
                  </p>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <div className="flex items-center mb-4">
                  <FiPackage className="text-blue-600 mr-3" />
                  <h3 className="font-medium text-gray-700">
                    Payment Information
                  </h3>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">
                      {currentOrder.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Order Status:</span>
                    <span
                      className={`font-medium ${
                        currentOrder.status === "delivered"
                          ? "text-green-600"
                          : currentOrder.status === "processing"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }`}>
                      {currentOrder.status || "Pending"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span
                      className={`font-medium ${
                        currentOrder.isPaid ? "text-green-600" : "text-red-600"
                      }`}>
                      {currentOrder.isPaid ? "Paid" : "Not Paid"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ${currentOrder.totalPrice?.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$5.00</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    ${(currentOrder.totalPrice * 0.1).toFixed(2)}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">
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
              <div className="space-y-3">
                <Link
                  to="/orders"
                  className="block w-full py-3 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  View All Orders
                </Link>

                <Link
                  to="/products"
                  className="block w-full py-3 text-center border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
                  Continue Shopping
                </Link>

                <button className="block w-full py-3 text-center border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Download Invoice
                </button>
              </div>

              {/* Support */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium text-gray-700 mb-3">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Email: support@ecommerce.com
                </p>
                <p className="text-sm text-gray-600">Phone: +1-234-567-890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
