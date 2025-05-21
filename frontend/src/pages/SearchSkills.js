import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SearchSkills = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    difficulty: 'all'
  });

  const categories = [
    'all',
    'Technology',
    'Arts & Crafts',
    'Cooking',
    'Music',
    'Language',
    'Sports',
    'Academic',
    'Professional'
  ];

  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/skills', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }

      const data = await response.json();
      setSkills(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         skill.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = filters.category === 'all' || skill.category === filters.category;
    const matchesDifficulty = filters.difficulty === 'all' || skill.difficulty === filters.difficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleExchangeRequest = (skillId) => {
    navigate(`/exchange/${skillId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search skills..."
              className="input-field"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          <div>
            <select
              className="input-field"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="input-field"
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Difficulties' : difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map(skill => (
          <div key={skill._id} className="card hover:shadow-lg transition-shadow">
            {/* Media Preview */}
            {skill.media && skill.media.length > 0 && (
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                {skill.media[0].type === 'image' ? (
                  <img
                    src={skill.media[0].url}
                    alt={skill.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={skill.media[0].url}
                    className="w-full h-full object-cover"
                    controls
                  />
                )}
              </div>
            )}

            {/* Content */}
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{skill.title}</h3>
                <span className="bg-primary-100 text-primary-800 text-sm px-2 py-1 rounded">
                  {skill.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{skill.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Duration: {skill.duration}h</span>
                <span>Level: {skill.difficulty}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    {skill.provider.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    by {skill.provider.username}
                  </span>
                </div>
                
                <button
                  onClick={() => handleExchangeRequest(skill._id)}
                  className="btn-primary"
                  disabled={skill.provider._id === user._id}
                >
                  {skill.provider._id === user._id ? 'Your Skill' : 'Request Exchange'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No skills found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default SearchSkills;
