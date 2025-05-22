import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FaEdit, FaPlus } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    bio: '',
    location: '',
    availability: '',
    interests: []
  });

  useEffect(() => {
    if (user) {
      setSkills(user.skills || []);
      // Load profile data from localStorage
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (savedProfile) {
        setProfileData(JSON.parse(savedProfile));
      }
    }
  }, [user]);

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    
    // Update in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, skills: updatedSkills } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify({ ...user, skills: updatedSkills }));
    
    setNewSkill('');
  };

  const saveProfile = () => {
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(profileData));
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full">
            {/* Profile Image Placeholder */}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-600">{user?.email}</p>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-2 flex items-center text-blue-500 hover:text-blue-600"
            >
              <FaEdit className="mr-1" /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Bio Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">About Me</h2>
            {isEditing ? (
              <textarea
                className="w-full p-2 border rounded"
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                rows="4"
              />
            ) : (
              <p className="text-gray-700">{profileData.bio || 'No bio added yet.'}</p>
            )}
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder="Add a new skill"
                />
                <button
                  onClick={handleAddSkill}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  <FaPlus />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Location & Availability */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-1"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Availability</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mt-1"
                    value={profileData.availability}
                    onChange={(e) => setProfileData({...profileData, availability: e.target.value})}
                    placeholder="e.g., Weekends, Evenings"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p><strong>Location:</strong> {profileData.location || 'Not specified'}</p>
                <p><strong>Availability:</strong> {profileData.availability || 'Not specified'}</p>
              </div>
            )}
          </div>

          {/* Exchange History */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Skill Exchange History</h2>
            <div className="space-y-4">
              {/* Add exchange history items here */}
              <p className="text-gray-600">No exchanges yet.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={saveProfile}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
