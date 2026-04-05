import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiLogOut, FiChevronDown } from 'react-icons/fi';
import Button from '../../ui/Button';

const UserMenu = ({ user, handleLogout }) => {
  if (user) {
    const userInitial = user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase();

    return (
      <div className="hidden lg:flex items-center space-x-1">
        <Link
          to="/profile"
          className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm">
            {userInitial || <FiUser className="h-4 w-4" />}
          </div>
          <span className="text-sm font-medium">
            {user.name || user.email?.split('@')[0]}
          </span>
        </Link>
        
        <button
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
          aria-label="Logout"
        >
          <FiLogOut className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center space-x-2">
      <Link to="/login">
        <Button variant="ghost" size="sm">
          Log in
        </Button>
      </Link>
      <Link to="/register">
        <Button size="sm">
          Sign up
        </Button>
      </Link>
    </div>
  );
};

export default UserMenu;