import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setPost(response.data);
        setLiked(response.data.liked || false);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${id}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleLike = async (commentId) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/comments/comments/${commentId}/like`);
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId ? res.data : comment
        )
      );
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(`http://localhost:5000/api/comments/${id}/comments`, {
        content: newComment,
        author: newAuthor || 'Anonymous',
      });
      setComments(prev => [...prev, res.data]);
      setNewComment('');
      setNewAuthor('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`);
        navigate("/");
      } catch (err) {
        console.error("Error deleting post:", err);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (loading) return <p className="p-4 text-center text-lg">Loading...</p>;
  if (!post) return <p className="p-4 text-red-600 text-center">Post not found.</p>;

  return (
<div className="min-h-screen bg-transparent bg-cover bg-center bg-no-repeat py-10 px-4 backdrop-blur-sm" style={{ backgroundImage: "url('https://png.pngtree.com/background/20250102/original/pngtree-blue-and-purple-gradient-background-picture-image_15472172.jpg')" }}>
  <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
    
    {/* Header Buttons */}
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={() => navigate("/")}
        className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 text-white-700 rounded"
      >
        ← Back
      </button>

      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          🗑️ Delete
        </button>
      </div>
    </div>

    {/* Blog Content */}
    <h1 className="text-3xl font-bold mb-2 text-blue-700">{post.title}</h1>
    <p className="text-sm text-gray-400 italic mb-4">Category: {post.category}</p>

    {post.imageUrl && (
      <div className="flex justify-center items-center mb-6">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="max-w-full max-h-[300px] object-cover rounded-lg shadow-md"
        />
      </div>
    )}

    <div className="text-base text-gray-100 whitespace-pre-line leading-relaxed mb-10">
      {post.content}
    </div>

    {/* Comments Section */}
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-blue-600 mb-4">Comments</h3>

      <form onSubmit={handleCommentSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="3"
          placeholder="Write a comment..."
          className="w-full border border-gray-300 p-3 rounded mb-2"
          required
        ></textarea>
        <input
          type="text"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full border border-gray-300 p-3 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      {comments.map((comment) => (
        <div key={comment._id} className="bg-white/10 p-4 rounded-lg mb-4 shadow hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-blue-500">{comment.author}</span>
            <button
              onClick={() => handleLike(comment._id)}
              className="text-sm text-gray-300 hover:text-blue-400"
            >
              ❤️ {comment.likes || 0}
            </button>
          </div>
          <p className="text-gray-100">{comment.content}</p>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default BlogDetail;
