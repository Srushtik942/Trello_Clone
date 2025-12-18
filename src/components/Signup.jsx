import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSignUpButton = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success('Successfully signed up!');
        navigate("/login");
      } else {
        toast.error("Error during signup! Check fields properly!");
      }
    } catch (error) {
      toast.error("Error in Signup");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="bg-gray-900 p-8 sm:p-10 md:p-12 rounded-2xl shadow-2xl w-full max-w-md text-white">

        {/* Title */}
        <h3 className="text-4xl font-bold mb-2 text-center text-blue-500">Workasna</h3>
        <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSignUpButton}>

          {/* Name */}
          <div>
            <label htmlFor="nameId" className="block mb-2 text-gray-300">Name:</label>
            <input
              type="text"
              id="nameId"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="emailId" className="block mb-2 text-gray-300">Email:</label>
            <input
              type="email"
              id="emailId"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-gray-300">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Login Redirect */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?
          <span
            className="text-blue-500 hover:underline cursor-pointer ml-1"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
