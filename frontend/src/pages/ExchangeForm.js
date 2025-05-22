import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ExchangeForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    skillOffered: '',
    skillRequested: '',
    description: '',
    duration: '1',
    availability: '',
    meetingPreference: 'online'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing exchanges from localStorage
    const exchanges = JSON.parse(localStorage.getItem('exchanges') || '[]');
    
    // Create new exchange
    const newExchange = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      status: 'open',
      createdAt: new Date().toISOString(),
      ...formData
    };
    
    // Save to localStorage
    localStorage.setItem('exchanges', JSON.stringify([...exchanges, newExchange]));
    
    // Redirect to search page
    navigate('/search');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Create Skill Exchange</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill You're Offering
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.skillOffered}
              onChange={(e) => setFormData({...formData, skillOffered: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill You're Looking For
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.skillRequested}
              onChange={(e) => setFormData({...formData, skillRequested: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (hours)
              </label>
              <select
                className="w-full p-2 border rounded"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              >
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Preference
              </label>
              <select
                className="w-full p-2 border rounded"
                value={formData.meetingPreference}
                onChange={(e) => setFormData({...formData, meetingPreference: e.target.value})}
              >
                <option value="online">Online</option>
                <option value="in-person">In Person</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="e.g., Weekends, Evenings after 6pm"
              value={formData.availability}
              onChange={(e) => setFormData({...formData, availability: e.target.value})}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Create Exchange
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExchangeForm;
