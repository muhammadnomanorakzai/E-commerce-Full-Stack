import React from 'react';
import { FiPackage, FiShoppingBag, FiTruck, FiShield } from 'react-icons/fi';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';

const features = [
  {
    icon: FiPackage,
    title: 'Wide Selection',
    description: 'Thousands of premium products across multiple categories tailored for you.',
    color: 'blue',
  },
  {
    icon: FiShoppingBag,
    title: 'Easy Shopping',
    description: 'A simple, intuitive, and modern interface for seamless browsing.',
    color: 'teal',
  },
  {
    icon: FiTruck,
    title: 'Fast Delivery',
    description: 'Lightning-quick shipping with real-time tracking to your door.',
    color: 'orange',
  },
  {
    icon: FiShield,
    title: 'Secure Payment',
    description: '100% secure, encrypted payments with multiple versatile options.',
    color: 'violet',
  },
];

const colorClasses = {
  blue: 'from-blue-50 to-blue-100 text-blue-600',
  teal: 'from-teal-50 to-teal-100 text-teal-600',
  orange: 'from-orange-50 to-orange-100 text-orange-600',
  violet: 'from-violet-50 to-violet-100 text-violet-600',
};

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Why Choose ShopEasy?
          </h2>
          <p className="text-gray-600 text-lg">
            We pride ourselves on delivering an exceptional shopping experience from start to finish.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              hover
              padding="lg"
              className="group animate-fadeIn"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-center">
                <div className={`
                  w-16 h-16 mx-auto bg-gradient-to-br ${colorClasses[feature.color]} 
                  rounded-2xl flex items-center justify-center mb-6 
                  group-hover:scale-110 transition-transform duration-300
                `}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;