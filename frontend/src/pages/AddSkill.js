import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AddSkill = () => {
  const [skill, setSkill] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUser = {
      ...user,
      skills: [...(user.skills || []), skill]
    };

    const updatedUsers = users.map(u => 
      u.id === user.id ? updatedUser : u
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4">
      <input
        type="text"
        placeholder="Add a new skill"
        className="w-full p-2 mb-4 border rounded"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Add Skill
      </button>
    </form>
  );
};

export default AddSkill;
