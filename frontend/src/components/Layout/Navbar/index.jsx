import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/slices/authSlice';
import {
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiSearch,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { HiOutlineHome } from 'react-icons/hi';
import Button from '../../../components/ui/Button';
import Container from '../../../components/ui/Container';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products');
    }
  };

  const cartItemsCount = items?.length || 0;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-600/20">
              <HiOutlineHome className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ShopEasy
              </span>
              <span className="text-[10px] uppercase tracking-wider text-blue-600 font-semibold -mt-1">
                Premium
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-auto px-8">
            <NavLinks user={user} />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-md">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
              aria-label="Shopping cart"
            >
              <FiShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-[10px] font-bold text-white ring-2 ring-white">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <UserMenu user={user} handleLogout={handleLogout} />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          user={user}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          handleLogout={handleLogout}
        />
      </Container>
    </nav>
  );
};

export default Navbar;