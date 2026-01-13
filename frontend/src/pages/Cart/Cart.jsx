import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCart,
  removeItemFromCart,
  addItemToCart,
} from "../../redux/slices/cartSlice";
import Navbar from "../../components/Layout/Navbar";
import Loader from "../../components/UI/Loader";
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiShoppingBag,
} from "react-icons/fi";
import toast from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice, loading, error } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Show error toast if any
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(removeItemFromCart(productId)).unwrap();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
      console.error(error);
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    try {
      await dispatch(
        addItemToCart({
          productId,
          quantity: 1,
        })
      ).unwrap();

      toast.success("Quantity increased");
    } catch {
      toast.error("Failed to increase quantity");
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    try {
      const item = items.find(
        (item) =>
          (typeof item.product === "string"
            ? item.product
            : item.product._id) === productId
      );

      if (!item) return;

      if (item.quantity === 1) {
        await dispatch(removeItemFromCart(productId)).unwrap();
        toast.success("Item removed from cart");
        return;
      }

      await dispatch(removeItemFromCart(productId)).unwrap();

      await dispatch(
        addItemToCart({
          productId,
          quantity: item.quantity - 1,
        })
      ).unwrap();

      toast.success("Quantity decreased");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };
  // Add this useEffect to debug
  useEffect(() => {
    console.log("Cart items updated:", items);
    console.log("Cart loading:", loading);
    console.log("Cart error:", error);
  }, [items, loading, error]);
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Your Shopping Cart
              </h1>
              <p className="text-gray-600">
                {items.length} {items.length === 1 ? "item" : "items"} in your
                cart
              </p>
            </div>
            <Link
              to="/products"
              className="flex items-center text-blue-600 hover:text-blue-800">
              <FiArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Cart Content */}
        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <FiShoppingBag className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Add some products to your cart to see them here
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {items.map((item) => (
                  <div key={item._id} className="border-b last:border-b-0">
                    <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                        {item.product?.image ? (
                          <img
                            src={item.product.image?.url}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {item.product?.name || "Unknown Product"}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              ${item.price} each
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-blue-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${item.price} × {item.quantity}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() =>
                                handleDecreaseQuantity(
                                  typeof item.product === "string"
                                    ? item.product
                                    : item.product._id
                                )
                              }
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
                              <FiMinus />
                            </button>

                            <span className="text-lg font-medium w-8 text-center">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                handleIncreaseQuantity(item.product._id)
                              }
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
                              <FiPlus />
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              handleRemoveItem(
                                typeof item.product === "string"
                                  ? item.product
                                  : item.product._id
                              )
                            }
                            className="flex items-center text-red-600 hover:text-red-800 cursor-pointer">
                            <FiTrash2 className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
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

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        ${(totalPrice + 5 + totalPrice * 0.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium mb-4">
                  Proceed to Checkout
                </button>

                <div className="text-center text-sm text-gray-500">
                  <p>Secure checkout</p>
                  <p>All transactions are encrypted</p>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Link
                    to="/products"
                    className="block w-full py-2 text-center text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
