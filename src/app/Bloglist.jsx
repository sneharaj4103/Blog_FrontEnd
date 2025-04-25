// src/components/BlogList.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs');
        setPosts(res.data);
        setFilteredPosts(res.data);
        const uniqueCategories = ['All', ...new Set(res.data.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Filter handler
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // reset to page 1
    if (category === 'All') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => post.category === category);
      setFilteredPosts(filtered);
    }
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
   <div
      className="min-h-screen py-10 px-4"
      style={{
        backgroundImage: "url('https://png.pngtree.com/background/20250102/original/pngtree-blue-and-purple-gradient-background-picture-image_15472172.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backgroundBlendMode: 'lighten',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Filter Dropdown */}
        <div className="mb-6 flex justify-end">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="p-2 border border-gray-300 rounded-md bg-white text-black"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Blog Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <div key={post._id} className="bg-white/90 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-bold text-blue-800 mb-2">{post.title}</h2>
              <p className="text-sm text-gray-600 mb-1">{post.category}</p>
              <p className="text-gray-800 mb-4 line-clamp-3">{post.summary}</p>
              <Link
                to={`/blog/${post._id}`}
                className="text-blue-700 font-semibold hover:underline"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
