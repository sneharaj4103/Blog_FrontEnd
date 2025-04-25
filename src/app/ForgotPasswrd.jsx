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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleResetRequest} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Your Password</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Email address</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your email"
        />

        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition font-semibold"
        >
          Send Reset Link
        </button>

        {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
