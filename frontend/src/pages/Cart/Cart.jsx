import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  fetchCart, 
  removeItemFromCart, 
  addItemToCart,
} from '../../redux/slices/cartSlice';
import { FiArrowLeft, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Components
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import EmptyCart from './components/EmptyCart';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleRemoveItem = async (productId) => {
    try {
      await dispatch(removeItemFromCart(productId)).unwrap();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    try {
      await dispatch(addItemToCart({ productId, quantity: 1 })).unwrap();
      toast.success('Quantity increased');
    } catch {
      toast.error('Failed to increase quantity');
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    try {
      const item = items.find(
        (item) => (typeof item.product === 'string' ? item.product : item.product._id) === productId
      );

      if (!item) return;

      if (item.quantity === 1) {
        await dispatch(removeItemFromCart(productId)).unwrap();
        toast.success('Item removed from cart');
        return;
      }

      await dispatch(removeItemFromCart(productId)).unwrap();
      await dispatch(addItemToCart({ productId, quantity: item.quantity - 1 })).unwrap();
      toast.success('Quantity decreased');
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await dispatch(clearCart()).unwrap();
        toast.success('Cart cleared');
      } catch {
        toast.error('Failed to clear cart');
      }
    }
  };

  // Calculations
  const shipping = items.length > 0 ? 5.0 : 0;
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader size="lg" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <main className="flex-grow py-8 md:py-12">
        <Container>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            
            <div className="flex gap-3">
              {items.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearCart}
                  className="text-gray-600"
                >
                  Clear Cart
                </Button>
              )}
              <Link to="/products">
                <Button variant="outline" size="sm" icon={FiArrowLeft}>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  {/* Desktop Header - Hidden on mobile */}
                  <div className="hidden md:grid md:grid-cols-12 md:gap-4 bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="col-span-6">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Product
                      </span>
                    </div>
                    <div className="col-span-3 text-center">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Quantity
                      </span>
                    </div>
                    <div className="col-span-3 text-right">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Total
                      </span>
                    </div>
                  </div>

                  {/* Cart Items List */}
                  <div className="divide-y divide-gray-100">
                    {items.map((item, index) => (
                      <CartItem
                        key={item._id || index}
                        item={item}
                        onIncrease={handleIncreaseQuantity}
                        onDecrease={handleDecreaseQuantity}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={totalPrice}
                  shipping={shipping}
                  tax={tax}
                  total={finalTotal}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;