import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setIsExpanded(false);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="flex items-center">
        {isExpanded && (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48 md:w-64"
            autoFocus
          />
        )}

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 ${
            isExpanded
              ? "border border-l-0 border-gray-300 rounded-r-md"
              : "rounded-md"
          } hover:bg-gray-100`}>
          {isExpanded ? <FiX /> : <FiSearch />}
        </button>

        {isExpanded && searchTerm && (
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Search
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
