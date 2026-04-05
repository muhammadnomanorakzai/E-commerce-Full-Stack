import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiLogOut } from 'react-icons/fi';
import SearchBar from './SearchBar';
import Button from '../../ui/Button';

const MobileMenu = ({ isOpen, user, searchQuery, setSearchQuery, handleSearch, handleLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden py-4 border-t border-gray-200 animate-fadeIn">
      <div className="space-y-4">
        {/* Mobile Search */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          isMobile
        />

        {/* Mobile Navigation Links */}
        <div className="flex flex-col space-y-2">
          <Link
            to="/"
            className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
            onClick={() => {}}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
          >
            Products
          </Link>
          <Link
            to="/orders"
            className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
          >
            Orders
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300"
            >
              Admin Dashboard
            </Link>
          )}
        </div>

        {/* Mobile User Actions */}
        {user ? (
          <div className="pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Link
                to="/profile"
                className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:text-blue-600"
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                  <FiUser className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {user.name || user.email?.split('@')[0]}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">
                    {user.role || 'Customer'}
                  </span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
              >
                <FiLogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-2 border-t border-gray-200 flex space-x-3">
            <Link to="/login" className="flex-1">
              <Button variant="outline" size="sm" fullWidth>
                Log in
              </Button>
            </Link>
            <Link to="/register" className="flex-1">
              <Button size="sm" fullWidth>
                Sign up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;