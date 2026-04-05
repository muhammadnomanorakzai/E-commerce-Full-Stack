import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import Input from '../../../components/ui/Input';

const ShippingForm = ({ formData, onChange, errors = {} }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <FiMapPin className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Input
            label="Street Address"
            name="shipping.address"
            value={formData.shippingAddress.address}
            onChange={onChange}
            error={errors.address}
            required
            placeholder="123 Main St, Apt 4B"
            icon={FiMapPin}
          />
        </div>

        <Input
          label="City"
          name="shipping.city"
          value={formData.shippingAddress.city}
          onChange={onChange}
          error={errors.city}
          required
          placeholder="New York"
        />

        <Input
          label="Postal Code"
          name="shipping.postalCode"
          value={formData.shippingAddress.postalCode}
          onChange={onChange}
          error={errors.postalCode}
          required
          placeholder="10001"
        />

        <div className="md:col-span-2">
          <Input
            label="Country"
            name="shipping.country"
            value={formData.shippingAddress.country}
            onChange={onChange}
            error={errors.country}
            required
            placeholder="United States"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;