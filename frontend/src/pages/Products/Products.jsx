import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import Navbar from "../../components/Layout/Navbar";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/UI/Loader";
import { FiFilter, FiSearch, FiX } from "react-icons/fi";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { products, loading, error } = useSelector((state) => state.products);

  // Get search query from URL
  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("search") || "";
  };

  // Initialize searchTerm from URL
  const [searchTerm, setSearchTerm] = useState(getSearchQuery());
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Update searchTerm when URL changes
  useEffect(() => {
    setSearchTerm(getSearchQuery());
  }, [location.search]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/products"); // Clear search
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    navigate("/products"); // Clear URL search
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const searchQuery = searchTerm.toLowerCase();
    const matchesSearch = searchTerm
      ? product.name?.toLowerCase().includes(searchQuery) ||
        product.description?.toLowerCase().includes(searchQuery) ||
        product.category?.toLowerCase().includes(searchQuery)
      : true;

    const matchesCategory =
      !categoryFilter || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">
            Browse our collection of amazing products
          </p>
        </div>

        {/* Search Results Message */}
        {getSearchQuery() && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-blue-700">
                Search results for: "
                <span className="font-semibold">{getSearchQuery()}</span>"
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  navigate("/products");
                }}
                className="flex items-center text-blue-500 hover:text-blue-700 text-sm">
                <FiX className="mr-1" />
                Clear search
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      navigate("/products");
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <FiX />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Search
            </button>

            {/* Clear Filters Button */}
            {(searchTerm || categoryFilter) && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
                Clear All
              </button>
            )}
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">😕</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || categoryFilter
                ? "Try adjusting your search or filter"
                : "No products available in the store"}
            </p>
            {(searchTerm || categoryFilter) && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Products Count */}
            <div className="mt-8 text-center text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
              {(searchTerm || categoryFilter) && (
                <button
                  onClick={handleClearFilters}
                  className="ml-4 text-blue-600 hover:text-blue-800">
                  Show all products
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
