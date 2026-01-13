import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewOrder, clearOrderState } from "../../redux/slices/orderSlice";
import Navbar from "../../components/Layout/Navbar";
import Input from "../../components/UI/Input";
import Loader from "../../components/UI/Loader";
import { FiMapPin, FiCreditCard, FiCheck, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { loading, error, success } = useSelector((state) => state.orders);

  const [formData, setFormData] = useState({
    // Shipping Address
    shippingAddress: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
    // Payment
    paymentMethod: "COD", // Cash on Delivery
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("shipping.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        shippingAddress: {
          ...formData.shippingAddress,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const { address, city, postalCode, country } = formData.shippingAddress;
    if (!address || !city || !postalCode || !country) {
      toast.error("Please fill in all shipping details");
      return;
    }

    // Prepare order data
    const orderData = {
      orderItems: items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress: formData.shippingAddress,
      paymentMethod: formData.paymentMethod,
      totalPrice: totalPrice,
    };

    try {
      // Create order
      const result = await dispatch(createNewOrder(orderData)).unwrap();

      if (result) {
        // Clear cart

        // Show success message
        toast.success("Order placed successfully!");

        // Redirect to order confirmation
        navigate(`/order/${result._id}`);
      }
    } catch (error) {
      toast.error(error || "Failed to place order");
    }
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-6">
              Add some products to your cart before checkout
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Browse Products
            </button>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Checkout
              </h1>
              <p className="text-gray-600">Complete your purchase</p>
            </div>
            <button
              onClick={handleBackToCart}
              className="flex items-center text-blue-600 hover:text-blue-800">
              <FiArrowLeft className="mr-2" />
              Back to Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Forms */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center mb-6">
                <FiMapPin className="text-blue-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-800">
                  Shipping Address
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Address"
                    name="shipping.address"
                    value={formData.shippingAddress.address}
                    onChange={handleChange}
                    required
                    placeholder="Street address"
                  />

                  <Input
                    label="City"
                    name="shipping.city"
                    value={formData.shippingAddress.city}
                    onChange={handleChange}
                    required
                    placeholder="City"
                  />

                  <Input
                    label="Postal Code"
                    name="shipping.postalCode"
                    value={formData.shippingAddress.postalCode}
                    onChange={handleChange}
                    required
                    placeholder="Postal code"
                  />

                  <Input
                    label="Country"
                    name="shipping.country"
                    value={formData.shippingAddress.country}
                    onChange={handleChange}
                    required
                    placeholder="Country"
                  />
                </div>

                {/* Payment Method */}
                <div className="mt-8">
                  <div className="flex items-center mb-6">
                    <FiCreditCard className="text-blue-600 mr-3" />
                    <h2 className="text-xl font-bold text-gray-800">
                      Payment Method
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={formData.paymentMethod === "COD"}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div>
                        <span className="font-medium">
                          Cash on Delivery (COD)
                        </span>
                        <p className="text-sm text-gray-600">
                          Pay when you receive the order
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Card"
                        checked={formData.paymentMethod === "Card"}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div>
                        <span className="font-medium">Credit/Debit Card</span>
                        <p className="text-sm text-gray-600">
                          Pay securely with your card
                        </p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Bank"
                        checked={formData.paymentMethod === "Bank"}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div>
                        <span className="font-medium">Bank Transfer</span>
                        <p className="text-sm text-gray-600">
                          Transfer money to our bank account
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center">
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        <FiCheck className="mr-2" />
                        Place Order
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">
                  Items ({items.length})
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded mr-3">
                          {item.product.image && (
                            <img
                              src={item.product.image?.url}
                              alt={item.product.name}
                              className="w-full h-full object-cover rounded"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity}
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

              {/* Price Summary */}
              <div className="border-t pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">$5.00</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                      ${(totalPrice * 0.1).toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        ${(totalPrice + 5 + totalPrice * 0.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium text-gray-700 mb-2">
                  Contact Information
                </h3>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-600">{user?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
