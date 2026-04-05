import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="inline-flex p-4 bg-blue-50 rounded-full mb-6">
          <FiShoppingBag className="w-12 h-12 text-blue-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        
        <p className="text-gray-600 mb-8">
          Looks like you haven't added anything to your cart yet. 
          Browse our products and find something you'll love!
        </p>
        
        <Link to="/products">
          <Button size="lg" icon={FiArrowRight} iconPosition="right">
            Start Shopping
          </Button>
        </Link>

        {/* Featured Categories */}
        <div className="mt-12">
          <p className="text-sm text-gray-500 mb-4">Popular Categories:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Electronics', 'Fashion', 'Home', 'Books', 'Sports'].map((category) => (
              <Link
                key={category}
                to={`/products?category=${category.toLowerCase()}`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;