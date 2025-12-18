import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from '../Context/AuthContext';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleClickLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // localStorage.setItem("token", data.token);
        login(data.token);
        navigate("/dashboard", { replace: true });
        toast.success("Successfully logged in!");
        navigate("/dashboard");
      } else {
        toast.error(data?.error || "Invalid email or password!");
      }

    } catch (error) {
      toast.error("Error in Login!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-gray-900 p-10 rounded-xl shadow-lg w-full max-w-md">

        {/* Title */}
        <h3 className="text-4xl font-bold mb-4 text-center text-blue-500">
          Workly
        </h3>
        <h1 className="text-2xl font-bold mb-8 text-center">
          Login to your account
        </h1>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleClickLogin}>

          {/* Email */}
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded border border-gray-500 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password with Eye */}
          <div>
            <label className="block mb-2">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 pr-12 rounded border border-gray-500 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 font-bold py-2 rounded transition"
          >
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Don't have an account?
            <Link to="/signup" className="text-green-400 ml-1 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
