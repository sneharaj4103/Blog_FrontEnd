import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    imageUrl: '',
    tags: '',
    category: '',
    status: 'draft',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
    };

    try {
      await axios.post('http://localhost:5000/api/blogs', blogData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Post created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post.');
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

  {/* Form container */}
  <div className="relative max-w-3xl mx-auto bg-white/90 p-8 rounded-2xl shadow-lg">
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 border-b pb-2">Create Blog Post</h1>

      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <textarea
        className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="6"
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        required
      />

      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
      />

      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
      />

      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
        Submit Post
      </button>
    </form>
  </div>
</div>

  );
}
