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

  if (loading) return <p className="p-4 text-center text-lg">Loading...</p>;
  if (!post) return <p className="p-4 text-red-600 text-center">Post not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
          >
            ← Back
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-2 text-gray-900">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4 italic">Category: {post.category}</p>

        {post.imageUrl && (
          <div className="flex justify-center items-center mb-6">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-50 h-50 rounded-lg shadow"
            />
          </div>
        )}

        <div className="text-lg text-gray-800 whitespace-pre-line leading-relaxed mb-6">
          {post.content}
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
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
              className="w-full border border-gray-300 p-3 rounded mb-2"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Post Comment
            </button>
          </form>

          <ul className="space-y-4">
            {comments.map((comment, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded shadow-sm">
                <p className="text-gray-800">{comment.content}</p>
                <p className="text-xs text-gray-500 mt-1">— {comment.author || 'Anonymous'}</p>
                <button
                  onClick={() => handleLike(comment._id)}
                  className="text-sm text-blue-600 hover:underline mt-2"
                >
                  👍 Like ({comment.likes})
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
