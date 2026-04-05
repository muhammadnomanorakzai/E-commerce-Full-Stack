import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/UI/Loader";
import { FiFilter, FiSearch, FiX, FiSliders } from "react-icons/fi";

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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center items-center">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Our Collection
            </h1>
            <p className="text-slate-500 text-lg">
              Explore premium products curated just for you.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            Showing <span className="text-slate-900 font-bold">{filteredProducts.length}</span> results
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700 font-medium"
            >
              <FiSliders className="w-5 h-5" />
              <span>{showMobileFilters ? "Hide Filters" : "Show Filters"}</span>
            </button>
          </div>

          {/* Sidebar / Filters */}
          <aside className={`lg:w-64 flex-shrink-0 ${showMobileFilters ? "block" : "hidden lg:block"} mb-8 lg:mb-0`}>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-28">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                <FiFilter className="mr-2 text-blue-600" /> Filters
              </h2>

              <form onSubmit={handleSearch} className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Search</label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchTerm("");
                          navigate("/products");
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        <FiX className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cat-all"
                        name="category"
                        value=""
                        checked={categoryFilter === ""}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="cat-all" className="ml-3 text-sm text-slate-600 hover:text-slate-900 cursor-pointer">
                        All Categories
                      </label>
                    </div>
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={`cat-${category}`}
                          name="category"
                          value={category}
                          checked={categoryFilter === category}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor={`cat-${category}`} className="ml-3 text-sm text-slate-600 hover:text-slate-900 cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-blue-600 transition-colors duration-300 shadow-sm">
                  Apply Filters
                </button>

                {/* Clear Filters Button */}
                {(searchTerm || categoryFilter) && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="w-full py-2.5 text-slate-600 font-medium bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors duration-300">
                    Clear All
                  </button>
                )}
              </form>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center">
                <span className="mr-2">⚠️</span> {error}
              </div>
            )}

            {/* Current Search Status */}
            {getSearchQuery() && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between shadow-sm">
                <p className="text-sm font-medium text-blue-800">
                  Search results for: <span className="font-bold">"{getSearchQuery()}"</span>
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    navigate("/products");
                  }}
                  className="text-white bg-blue-600 hover:bg-blue-700 w-6 h-6 rounded-full flex items-center justify-center transition-colors">
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiSearch className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  No products found
                </h3>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                  We couldn't find what you're looking for. Try adjusting your search keywords or filters.
                </p>
                {(searchTerm || categoryFilter) && (
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
