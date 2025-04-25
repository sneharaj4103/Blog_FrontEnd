import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      alert('Login successful');
      localStorage.setItem('token', res.data.token);
      navigate("/")

    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login to Your Account</h2>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
  <a href="/forgot-password" className="text-indigo-600 hover:underline">
    Forgot your password?
  </a>
</p>

        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}