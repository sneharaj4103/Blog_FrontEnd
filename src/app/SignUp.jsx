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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create New User</h2>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

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

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
            <select
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          className="mt-6 w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition font-semibold"
        >
          Create User
        </button>
      </form>
    </div>
  );
}
