// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetRequest = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot', { email });
      setMessage('Check your email for password reset instructions.');
    } catch (err) {
      setMessage('Failed to send reset link. Please try again.');
    }
  };

  return (
<div
  className="min-h-screen bg-cover bg-center bg-no-repeat py-10 px-4 relative"
  style={{
    backgroundImage:
      "url('https://png.pngtree.com/background/20250102/original/pngtree-blue-and-purple-gradient-background-picture-image_15472172.jpg')",
  }}
>
  {/* Light overlay */}
  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

  <div className="relative max-w-6xl mx-auto p-8 rounded-2xl shadow-lg w-full max-w-md bg-white/90">
    <form onSubmit={handleResetRequest} className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 border-b pb-2 text-center">
        Reset Your Password
      </h2>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-800">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
        Send Reset Link
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-800">{message}</p>
      )}
    </form>
  </div>
</div>

  );
};

export default ForgotPassword;
