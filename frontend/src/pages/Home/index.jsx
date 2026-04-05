import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import AdminOverview from './AdminOverview';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <main className="flex-grow">
        <HeroSection user={user} />
        <FeaturesSection />
        {user?.role === 'admin' && <AdminOverview />}
      </main>

      <Footer />
    </div>
  );
};

export default Home;