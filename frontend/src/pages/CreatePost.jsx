import { useState } from 'react';
import './CreatePost.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/createpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 201 || res.status === 200) {
        alert('Post created successfully!');
        navigate('/feed');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="post-container">
      <form className="post-card" onSubmit={handleSubmit}>
        <h1>Create Post</h1>

        <div className="form-group">
          <label htmlFor="image-input">Upload Image</label>
          <input
            id="image-input"
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="caption-input">Add Caption</label>
          <input
            id="caption-input"
            type="text"
            name="caption"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;