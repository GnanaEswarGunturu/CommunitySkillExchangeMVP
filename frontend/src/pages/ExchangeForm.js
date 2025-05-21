import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ExchangeForm = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: 1,
    message: ''
  });

  useEffect(() => {
    fetchSkillDetails();
  }, [skillId]);

  const fetchSkillDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/skills/${skillId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch skill details');
      }

      const data = await response.json();
      setSkill(data);
      setFormData(prev => ({
        ...prev,
        duration: data.duration
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Combine date and time
      const scheduledDateTime = new Date(`${formData.date}T${formData.time}`);

      const response = await fetch('http://localhost:5000/api/exchanges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          skillId: skillId,
          providerId: skill.provider._id,
          seekerId: user.id,
          scheduledDate: scheduledDateTime,
          duration: formData.duration,
          message: formData.message
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create exchange request');
      }

      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !skill) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {skill && (
        <div className="space-y-6">
          {/* Skill Details Card */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">{skill.title}</h2>
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm">
                {skill.category}
              </span>
              <span className="text-gray-600">
                {skill.difficulty} Level
              </span>
              <span className="text-gray-600">
                {skill.duration} hour(s)
              </span>
            </div>
            <p className="text-gray-600 mb-4">{skill.description}</p>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                {skill.provider.username.charAt(0).toUpperCase()}
              </div>
              <span className="ml-2 text-gray-600">
                Offered by {skill.provider.username}
              </span>
            </div>
          </div>

          {/* Exchange Request Form */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Request Exchange</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    className="input-field"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (hours)
                </label>
                <input
                  type="number"
                  min="1"
                  max={skill.duration}
                  className="input-field"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message to Provider
                </label>
                <textarea
                  className="input-field"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Introduce yourself and explain what you'd like to learn..."
                  required
                />
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2">Exchange Terms:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• This exchange will cost {formData.duration} time credits</li>
                  <li>• Your current balance: {user.timeCredits} credits</li>
                  <li>• Credits will be transferred upon completion</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading || user.timeCredits < formData.duration}
                className={`btn-primary w-full ${
                  (loading || user.timeCredits < formData.duration) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Sending Request...' : 
                 user.timeCredits < formData.duration ? 'Insufficient Credits' : 
                 'Send Exchange Request'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeForm;
