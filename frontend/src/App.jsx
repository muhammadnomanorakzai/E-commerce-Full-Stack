import React from "react";
// import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/index";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/Orders/OrderConfirmation";
import Orders from "./pages/Orders/Orders";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProduct from "./pages/Admin/AddProduct";
import EditProduct from "./pages/Admin/EditProduct";
import Profile from "./pages/User/Profile";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" />;
};

// Public Route Component (redirects if logged in)
const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return !user ? children : <Navigate to="/" />;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user?.role === "admin" ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes - We'll create these later */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/add"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products/edit/:productId"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />

        {/* Other placeholder routes */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/:orderId"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
