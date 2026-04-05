import React from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiUsers, FiArrowRight } from 'react-icons/fi';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AdminOverview = () => {
  const stats = [
    {
      title: 'Total Products',
      value: '0',
      icon: FiPackage,
      color: 'blue',
      description: 'Manage products in admin panel',
    },
    {
      title: 'Total Orders',
      value: '0',
      icon: FiShoppingBag,
      color: 'teal',
      description: 'No orders placed yet',
    },
    {
      title: 'Total Users',
      value: '1',
      icon: FiUsers,
      color: 'violet',
      description: 'You are the active administrator',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <Card padding="lg" className="border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full mr-4"></span>
              Admin Overview
            </h3>
            <Link to="/admin">
              <Button variant="ghost" size="sm" icon={FiArrowRight} iconPosition="right">
                View Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={stat.title}
                padding="lg"
                hover
                className="bg-gray-50 border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {stat.title}
                    </p>
                    <p className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 bg-${stat.color}-100 rounded-xl text-${stat.color}-600`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </Container>
    </section>
  );
};

export default AdminOverview;