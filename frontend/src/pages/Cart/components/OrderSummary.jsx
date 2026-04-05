import React from 'react';
import { FiLock, FiShield, FiTruck } from 'react-icons/fi';
import Button from '../../../components/ui/Button';

const OrderSummary = ({ subtotal, shipping, tax, total, onCheckout, isCheckout = false }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold text-gray-900">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="text-2xl font-extrabold text-blue-600">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      {!isCheckout && (
        <Button
          onClick={onCheckout}
          variant="primary"
          size="lg"
          fullWidth
          className="mb-4"
        >
          Proceed to Checkout
        </Button>
      )}

      {/* Features */}
      <div className="space-y-3">
        <div className="flex items-center text-xs text-gray-500">
          <FiLock className="mr-2 text-gray-400" />
          <span>Secure encrypted checkout</span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <FiShield className="mr-2 text-green-500" />
          <span>Buyer protection guarantee</span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <FiTruck className="mr-2 text-blue-500" />
          <span>Free shipping on orders over $50</span>
        </div>
      </div>

      {/* Accepted Payment Methods */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-3">Accepted Payment Methods:</p>
        <div className="flex gap-2">
          {['VISA', 'MC', 'AMEX', 'PayPal'].map((method) => (
            <span
              key={method}
              className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600"
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;