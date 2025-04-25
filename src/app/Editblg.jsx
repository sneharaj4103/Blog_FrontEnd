import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', category: '', imageUrl: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, post);
      alert('Post updated successfully');
      navigate(`/blog/${id}`); // Navigate back to the blog detail page
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update the post');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  if (loading) return <p className="p-4 text-center text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Blog</h1>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={post.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">Image URL (Optional)</label>
          <input
            type="text"
            name="imageUrl"
            value={post.imageUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
