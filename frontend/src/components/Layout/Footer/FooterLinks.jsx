import React from 'react';
import { Link } from 'react-router-dom';

const FooterLinks = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;