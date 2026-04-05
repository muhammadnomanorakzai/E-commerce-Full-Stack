import React from 'react';

const Loader = ({ size = 'md', color = 'blue', fullScreen = false }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const colors = {
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <div className={`animate-spin rounded-full border-4 border-t-transparent ${colors[color]} ${sizes[size]} mx-auto`}></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`animate-spin rounded-full border-4 border-t-transparent ${colors[color]} ${sizes[size]}`}></div>
  );
};

export default Loader;