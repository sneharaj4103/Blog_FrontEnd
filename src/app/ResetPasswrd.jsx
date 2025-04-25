import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password,
      });
      alert(res.data.message || 'Password reset successful');
      navigate('/login');
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Reset Your Password</h2>

        {message && <p className="mb-4 text-red-500 text-sm text-center">{message}</p>}

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition font-semibold"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
