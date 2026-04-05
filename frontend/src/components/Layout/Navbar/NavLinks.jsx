import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavLinks = ({ user }) => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/orders', label: 'Orders' },
    ...(user?.role === 'admin' ? [{ to: '/admin', label: 'Admin', isAdmin: true }] : []),
  ];

  return (
    <div className="flex items-center space-x-1">
      {links.map((link) => {
        const isActive = location.pathname === link.to;
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`
              px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
              ${isActive 
                ? 'bg-blue-50 text-blue-600' 
                : link.isAdmin 
                  ? 'text-purple-600 hover:bg-purple-50' 
                  : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;