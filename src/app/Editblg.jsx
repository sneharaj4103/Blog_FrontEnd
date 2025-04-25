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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-10 px-4"
      style={{
        backgroundImage: "url('https://png.pngtree.com/background/20250102/original/pngtree-blue-and-purple-gradient-background-picture-image_15472172.jpg')",
      }}
    >
      <div className="max-w-6xl mx-auto bg-transparent p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white border-b pb-2 text-center mb-6">Edit Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-white">Title</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-white">Category</label>
            <input
              type="text"
              name="category"
              value={post.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-white">Content</label>
            <textarea
              name="content"
              value={post.content}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-white">Image URL (Optional)</label>
            <input
              type="text"
              name="imageUrl"
              value={post.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-white rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
