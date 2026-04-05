import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const productId = typeof item.product === 'string' ? item.product : item.product._id;
  const product = item.product || {};

  return (
    <div className="group relative">
      {/* Mobile View */}
      <div className="md:hidden p-4 border-b border-gray-100 last:border-0">
        <div className="flex gap-4">
          {/* Product Image */}
          <Link to={`/products/${productId}`} className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
              {product.image?.url ? (
                <img
                  src={product.image.url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  No image
                </div>
              )}
            </div>
          </Link>

          {/* Product Info */}
          <div className="flex-1">
            <Link to={`/products/${productId}`}>
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors">
                {product.name || 'Unknown Product'}
              </h3>
            </Link>
            <p className="text-blue-600 font-bold mb-2">${Number(item.price).toFixed(2)}</p>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => onDecrease(productId)}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600"
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold text-gray-900">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onIncrease(productId)}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600"
                  aria-label="Increase quantity"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => onRemove(productId)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                aria-label="Remove item"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-4 md:items-center p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
        {/* Product Info - Col Span 6 */}
        <div className="col-span-6">
          <div className="flex items-center gap-4">
            <Link to={`/products/${productId}`} className="flex-shrink-0">
              <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                {product.image?.url ? (
                  <img
                    src={product.image.url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    No image
                  </div>
                )}
              </div>
            </Link>
            
            <div className="flex-1">
              <Link to={`/products/${productId}`}>
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                  {product.name || 'Unknown Product'}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 mt-1">${Number(item.price).toFixed(2)} each</p>
            </div>
          </div>
        </div>

        {/* Quantity - Col Span 3 */}
        <div className="col-span-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onDecrease(productId)}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600"
                aria-label="Decrease quantity"
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-semibold text-gray-900">
                {item.quantity}
              </span>
              <button
                onClick={() => onIncrease(productId)}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600"
                aria-label="Increase quantity"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Total & Actions - Col Span 3 */}
        <div className="col-span-3">
          <div className="flex items-center justify-end gap-4">
            <p className="font-bold text-gray-900 text-lg">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => onRemove(productId)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              aria-label="Remove item"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;