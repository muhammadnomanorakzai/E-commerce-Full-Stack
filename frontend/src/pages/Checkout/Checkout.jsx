import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createNewOrder } from '../../redux/slices/orderSlice';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Components
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import Loader from '../../components/ui/Loader';
import ShippingForm from './components/ShippingForm';
import PaymentMethod from './components/PaymentMethod';
import OrderReview from './components/OrderReview';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.orders);

  const [formData, setFormData] = useState({
    shippingAddress: {
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
    paymentMethod: 'COD',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e;

    if (name.startsWith('shipping.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]: value,
        },
      }));
      // Clear error for this field
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { address, city, postalCode, country } = formData.shippingAddress;

    if (!address.trim()) newErrors.address = 'Address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all shipping details');
      return;
    }

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
      const result = await dispatch(createNewOrder(orderData)).unwrap();
      toast.success('Order placed successfully!');
      navigate(`/order/${result._id}`);
    } catch (error) {
      toast.error(error || 'Failed to place order');
    }
  };

  // Calculations
  const shipping = items.length > 0 ? 5.0 : 0;
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="inline-flex p-4 bg-blue-50 rounded-full mb-6">
              <FiShoppingBag className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Add some products to your cart before proceeding to checkout.
            </p>
            <Link to="/products">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
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
                Secure Checkout
              </h1>
              <p className="text-gray-600">Complete your purchase safely and securely</p>
            </div>
            
            <Link to="/cart">
              <Button variant="outline" size="sm" icon={FiArrowLeft}>
                Back to Cart
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} id="checkout-form">
                <ShippingForm
                  formData={formData}
                  onChange={handleChange}
                  errors={errors}
                />
                
                <div className="mt-6">
                  <PaymentMethod
                    selected={formData.paymentMethod}
                    onChange={(e) => handleChange({ name: 'paymentMethod', value: e.target.value })}
                  />
                </div>
              </form>
            </div>

            {/* Right Column - Order Review */}
            <div className="lg:col-span-1">
              <OrderReview
                items={items}
                subtotal={totalPrice}
                shipping={shipping}
                tax={tax}
                total={finalTotal}
                user={user}
                loading={loading}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;