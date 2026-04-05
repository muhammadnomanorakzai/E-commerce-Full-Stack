import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import Loader from "../../components/UI/Loader";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const result = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(result)) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error(error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4">
              <FiLogIn className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Please enter your details to sign in.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center mb-6">
              <span className="mr-2">⚠️</span> {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-white outline-none transition-all text-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-slate-700">
                  Password
                </label>
                <Link to="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="text-slate-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-white outline-none transition-all text-slate-900 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm flex justify-center items-center mt-4">
              {loading ? <Loader /> : "Sign In"}
            </button>
          </form>

          <p className="text-center text-slate-500 mt-8 font-medium">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-bold hover:text-blue-800 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
