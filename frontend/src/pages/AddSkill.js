import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddSkill = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology',
    difficulty: 'Beginner',
    duration: 1,
    media: []
  });

  const categories = [
    'Technology',
    'Arts & Crafts',
    'Cooking',
    'Music',
    'Language',
    'Sports',
    'Academic',
    'Professional'
  ];

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      media: [...prev.media, ...files]
    }));

    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(prev => [...prev, {
          type: file.type.startsWith('image/') ? 'image' : 'video',
          url: reader.result
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('difficulty', formData.difficulty);
      formDataToSend.append('duration', formData.duration);

      formData.media.forEach(file => {
        formDataToSend.append('media', file);
      });

      const response = await fetch('http://localhost:5000/api/skills', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add skill');
      }

      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Share Your Skill</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Title
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="input-field"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="input-field"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                className="input-field"
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (hours)
            </label>
            <input
              type="number"
              min="1"
              className="input-field"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Media (Images/Videos)
            </label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="input-field"
            />
            <p className="text-sm text-gray-500 mt-1">
              You can upload multiple images and videos
            </p>
          </div>

          {/* Media Preview */}
          {preview.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {preview.map((media, index) => (
                <div key={index} className="relative">
                  {media.type === 'image' ? (
                    <img
                      src={media.url}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded"
                    />
                  ) : (
                    <video
                      src={media.url}
                      className="w-full h-40 object-cover rounded"
                      controls
                    />
                  )}
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={() => {
                      setPreview(prev => prev.filter((_, i) => i !== index));
                      setFormData(prev => ({
                        ...prev,
                        media: prev.media.filter((_, i) => i !== index)
                      }));
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Adding Skill...' : 'Add Skill'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;
