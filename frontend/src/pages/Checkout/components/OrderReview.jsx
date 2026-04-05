import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiShield, FiLock } from 'react-icons/fi';
import Button from '../../../components/ui/Button';

const OrderReview = ({ items, subtotal, shipping, tax, total, user, loading, onSubmit }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Review</h2>

      {/* Order Items */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-700">Items ({items.length})</h3>
          <Link to="/cart" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Edit
          </Link>
        </div>
        
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
          {items.map((item) => (
            <div key={item.product._id} className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                {item.product.image?.url && (
                  <img
                    src={item.product.image.url}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{item.product.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              
              <p className="font-semibold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <FiCheck className="w-5 h-5 text-green-500" />
          <h3 className="font-semibold text-gray-900">Contact Information</h3>
        </div>
        <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
          <p className="font-medium text-gray-900">{user?.name || 'Guest User'}</p>
          <p>{user?.email || 'No email provided'}</p>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <div className="flex items-start gap-3">
          <FiShield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900 mb-1">Buyer Protection</p>
            <p className="text-xs text-gray-600">
              Get full refund if the item is not as described or not delivered.
            </p>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <Button
        onClick={onSubmit}
        variant="primary"
        size="lg"
        fullWidth
        disabled={loading}
        className="mt-6"
        icon={FiLock}
      >
        {loading ? 'Placing Order...' : 'Place Order Securely'}
      </Button>
    </div>
  );
};

export default OrderReview;