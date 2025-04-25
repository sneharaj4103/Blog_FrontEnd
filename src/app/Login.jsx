import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      alert('Login successful');
      localStorage.setItem('token', res.data.token);
      navigate("/");
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-10 px-4"
      style={{
        backgroundImage: "url('https://png.pngtree.com/background/20250102/original/pngtree-blue-and-purple-gradient-background-picture-image_15472172.jpg')",
      }}
    >
      <div className="max-w-6xl mx-auto bg-transparent p-8 rounded-2xl shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-white border-b pb-2 text-center">Login to Your Account</h2>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-white">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-white">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-white">
            <a href="/forgot-password" className="text-blue-400 hover:underline">
              Forgot your password?
            </a>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
