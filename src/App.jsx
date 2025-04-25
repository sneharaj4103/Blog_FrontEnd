import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import Home from './app/Home';
import Create from './app/Create';
import Login from "./app/Login"
import Signup from './app/SignUp';
import BlogList from './app/Bloglist';
import BlogDetail from './app/BlgDetai';
import UserProfile from './app/Userprofile';
import EditBlog from './app/Editblg';
import ForgotPassword from './app/ForgotPasswrd';
import ResetPassword from './app/ResetPasswrd';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setUser(res.data)).catch(() => setUser(null));
    }
  },[]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <nav className="flex justify-between mb-2 items-center px-6 py-4 bg-blue-600 text-white shadow-md">
        <Link to="/" className="text-2xl font-bold tracking-wide">MyBlog</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/create" className="hover:text-yellow-300">New Post</Link>
              <Link to="/profile" className="hover:text-yellow-300">{user.username || 'Profile'}</Link>
              <button onClick={handleLogout} className="hover:text-red-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300">Login</Link>
              <Link to="/register" className="hover:text-yellow-300">Register</Link>
              <Link to="/profile" className="hover:text-yellow-300">Profile</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<BlogList user={user} />} />
        <Route path="/blog/:id" element={<BlogDetail user={user} />} />
        <Route path="/create" element={<Create user={user} />} />
        <Route path="/profile" element={<UserProfile user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Signup setUser={setUser} />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />



      </Routes>
    </div>
  );
}

export default App;
