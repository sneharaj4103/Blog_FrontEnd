import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs').then(res => setPosts(res.data));
    console.log("dgd",posts)
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      {posts.map(post => (
        <div key={post._id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.content.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}