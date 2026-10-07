import { useState, useEffect } from 'react';
import './Feed.css';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/post')
      .then((res) => {
        setPosts(res.data.data || res.data.posts || []);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
      });
  }, []); 

  return (
    <section className="feed">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <img src={post.image} alt={post.caption || 'Post image'} />
            <p>{post.caption}</p>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </section>
  );
};

export default Feed;