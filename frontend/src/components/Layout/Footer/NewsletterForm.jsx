import React, { useState } from 'react';
import { FiMail, FiCheck } from 'react-icons/fi';
import Button from '../../ui/Button';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiMail className="h-4 w-4 text-gray-500" />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
          disabled={status === 'loading' || status === 'success'}
          required
        />
      </div>
      
      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        disabled={status === 'loading' || status === 'success'}
        icon={status === 'success' ? FiCheck : null}
      >
        {status === 'loading' ? 'Subscribing...' : 
         status === 'success' ? 'Subscribed!' : 
         'Subscribe'}
      </Button>
      
      {status === 'error' && (
        <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
};

export default NewsletterForm;