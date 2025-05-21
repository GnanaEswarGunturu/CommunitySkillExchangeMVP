import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data);
      setSkills(data.skills || []);
      setExchanges(data.exchanges || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="card mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-primary-600 font-semibold">
              Time Credits: {profile.timeCredits}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 ${activeTab === 'skills' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('skills')}
        >
          My Skills
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'exchanges' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('exchanges')}
        >
          Exchanges
        </button>
      </div>

      {/* Content */}
      {activeTab === 'skills' ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">My Skills</h3>
            <Link to="/add-skill" className="btn-primary">
              Add New Skill
            </Link>
          </div>
          
          {skills.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              You haven't added any skills yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map(skill => (
                <div key={skill._id} className="card">
                  <h4 className="font-semibold">{skill.title}</h4>
                  <p className="text-gray-600">{skill.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {skill.duration} hour(s)
                    </span>
                    <span className="text-sm bg-primary-100 text-primary-800 px-2 py-1 rounded">
                      {skill.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4">My Exchanges</h3>
          
          {exchanges.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              You haven't participated in any exchanges yet.
            </p>
          ) : (
            <div className="space-y-4">
              {exchanges.map(exchange => (
                <div key={exchange._id} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{exchange.skill.title}</h4>
                      <p className="text-gray-600">
                        {exchange.provider._id === user._id ? 'Teaching' : 'Learning'}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm ${
                      exchange.status === 'completed' ? 'bg-green-100 text-green-800' :
                      exchange.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {exchange.status.charAt(0).toUpperCase() + exchange.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {new Date(exchange.scheduledDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
