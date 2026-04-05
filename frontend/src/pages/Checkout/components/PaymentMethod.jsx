import React from 'react';
import { FiCreditCard, FiDollarSign, FiHome } from 'react-icons/fi';

const paymentMethods = [
  {
    id: 'COD',
    name: 'Cash on Delivery',
    description: 'Pay with cash when your order is delivered',
    icon: FiDollarSign,
    color: 'green',
  },
  {
    id: 'Card',
    name: 'Credit/Debit Card',
    description: 'Pay securely with your credit or debit card',
    icon: FiCreditCard,
    color: 'blue',
  },
  {
    id: 'Bank',
    name: 'Bank Transfer',
    description: 'Direct transfer to our bank account',
    icon: FiHome,
    color: 'purple',
  },
];

const PaymentMethod = ({ selected, onChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
          <FiCreditCard className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const isSelected = selected === method.id;
          const Icon = method.icon;
          
          return (
            <label
              key={method.id}
              className={`
                flex items-start p-5 border-2 rounded-xl cursor-pointer
                transition-all duration-300
                ${isSelected 
                  ? `border-${method.color}-500 bg-${method.color}-50/30` 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={isSelected}
                  onChange={onChange}
                  className={`
                    w-4 h-4 text-${method.color}-600 
                    border-gray-300 focus:ring-${method.color}-500
                  `}
                />
              </div>
              
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{method.name}</span>
                  <Icon className={`w-5 h-5 text-${method.color}-600`} />
                </div>
                <p className="text-sm text-gray-500 mt-1">{method.description}</p>
                
                {isSelected && method.id === 'Card' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-600">
                      Card payment integration will be added here.
                    </p>
                    <div className="flex gap-2 mt-3">
                      <div className="px-3 py-1 bg-white rounded-lg text-xs font-medium shadow-sm">
                        VISA
                      </div>
                      <div className="px-3 py-1 bg-white rounded-lg text-xs font-medium shadow-sm">
                        MasterCard
                      </div>
                      <div className="px-3 py-1 bg-white rounded-lg text-xs font-medium shadow-sm">
                        AMEX
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethod;