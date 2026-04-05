import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const HeroSection = ({ user }) => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-blue-500/10 blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px] animate-pulse animation-delay-2000"></div>
      </div>
      
      <Container>
        <div className="relative z-10 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <Badge variant="info" size="md" className="mb-8 animate-fadeIn">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                New Collection Arrived
              </span>
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 animate-slideUp">
              Discover Premium{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Products Daily
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed animate-slideUp animation-delay-200">
              {user?.name ? (
                <>Welcome back, <span className="font-semibold text-white">{user.name}</span>!</>
              ) : (
                'Welcome to ShopEasy.'
              )} Your one-stop destination for high-quality items at unbeatable prices. Shop the latest trends today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slideUp animation-delay-400">
              <Link to="/products">
                <Button size="lg" icon={FiArrowRight} iconPosition="right">
                  Shop Now
                </Button>
              </Link>
              
              {user?.role === 'admin' && (
                <Link to="/admin">
                  <Button variant="outline" size="lg">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;