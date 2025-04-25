import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('reader');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        role
      });
      alert('User created successfully');
      navigate("/login"); // redirect to user list page or dashboard
    } catch (err) {
      alert('Failed to create user');
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
  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0"></div>

  {/* Form container */}
  <div className="relative z-10 max-w-6xl mx-auto bg-white/90 p-8 rounded-2xl shadow-lg w-full max-w-xl">
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 border-b pb-2 text-center">
        Create New User
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-800">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-800">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-800">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-800">Role</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={role}
            onChange={e => setRole(e.target.value)}
            required
          >
            <option value="reader">Reader</option>
            <option value="author">Author</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
        Create User
      </button>
    </form>
  </div>
</div>

  );
}
