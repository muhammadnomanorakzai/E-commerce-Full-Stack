import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi';
import { FiTwitter, FiFacebook, FiInstagram, FiMail } from 'react-icons/fi';
import Container from '../../ui/Container';
import NewsletterForm from './NewsletterForm';
import FooterLinks from './FooterLinks';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <Container>
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl group-hover:scale-105 transition-transform duration-300">
                  <HiOutlineHome className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  ShopEasy
                </span>
              </Link>
              
              <p className="mt-6 text-sm text-gray-400 leading-relaxed max-w-sm">
                Your premium destination for modern shopping. Discover high-quality products curated just for you with seamless checkout and fast delivery.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4 mt-8">
                {[
                  { icon: FiTwitter, href: '#', label: 'Twitter' },
                  { icon: FiFacebook, href: '#', label: 'Facebook' },
                  { icon: FiInstagram, href: '#', label: 'Instagram' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-8">
                <FooterLinks
                  title="Quick Links"
                  links={[
                    { to: '/', label: 'Home' },
                    { to: '/products', label: 'All Products' },
                    { to: '/categories', label: 'Categories' },
                    { to: '/about', label: 'About Us' },
                    { to: '/contact', label: 'Contact' },
                  ]}
                />
                <FooterLinks
                  title="Customer Service"
                  links={[
                    { to: '/account', label: 'My Account' },
                    { to: '/orders', label: 'Track Order' },
                    { to: '/returns', label: 'Returns & Refunds' },
                    { to: '/faq', label: 'FAQ' },
                    { to: '/privacy', label: 'Privacy Policy' },
                  ]}
                />
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-3">
              <h3 className="text-white font-semibold mb-4">Newsletter</h3>
              <p className="text-sm text-gray-400 mb-4">
                Subscribe to get special offers, free giveaways, and exclusive deals.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} ShopEasy Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[
              { to: '/terms', label: 'Terms of Service' },
              { to: '/privacy', label: 'Privacy Policy' },
              { to: '/cookies', label: 'Cookie Policy' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;