import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, isMobile = false }) => {
  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-gray-400`} />
      </div>
      <input
        type="text"
        className={`
          block w-full pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg
          text-sm placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
          focus:bg-white transition-all duration-300
          ${isMobile ? 'py-2' : 'py-2.5'}
        `}
        placeholder={isMobile ? 'Search...' : 'Search products, categories...'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search"
      />
    </form>
  );
};

export default SearchBar;