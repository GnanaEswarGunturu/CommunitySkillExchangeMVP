import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaComment, FaShare, FaBookmark, FaCalendar } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const SearchSkills = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Get all users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Convert users' skills into posts with proper checks
      const allPosts = users.reduce((acc, currentUser) => {
        // Skip if no skills array or if it's the current user
        if (!currentUser.skills || currentUser.id === user?.id) {
          return acc;
        }

        const userPosts = currentUser.skills.map(skill => ({
          id: `${currentUser.id}-${skill}`,
          userId: currentUser.id,
          username: currentUser.name || 'Anonymous',
          userAvatar: currentUser.profileImage || 'https://via.placeholder.com/40',
          title: skill,
          content: currentUser.bio || `${currentUser.name} can teach ${skill}`,
          hourlyRate: currentUser.hourlyRate || '10',
          location: currentUser.location || 'Not specified',
          availability: currentUser.availability || 'Flexible',
          likes: Math.floor(Math.random() * 100),
          comments: Math.floor(Math.random() * 20),
          saved: false,
          timestamp: '2h ago'
        }));

        return [...acc, ...userPosts];
      }, []);

      setPosts(allPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error loading posts:', error);
      setPosts([]);
      setLoading(false);
    }
  }, [user?.id]);

  // Add some sample data if no posts exist
  useEffect(() => {
    if (posts.length === 0 && !loading) {
      const samplePosts = [
        {
          id: 1,
          userId: 'sample1',
          username: 'john_doe',
          userAvatar: 'https://via.placeholder.com/40',
          title: 'Guitar Lessons for Beginners',
          content: 'Learn guitar basics with easy-to-follow lessons',
          hourlyRate: '15',
          location: 'New York',
          availability: 'Weekends',
          media: 'https://via.placeholder.com/600x400',
          mediaType: 'image',
          likes: 124,
          comments: 15,
          saved: false,
          timestamp: '2h ago'
        },
        {
          id: 2,
          userId: 'sample2',
          username: 'jane_smith',
          userAvatar: 'https://via.placeholder.com/40',
          title: 'Piano Lessons',
          content: 'Professional piano instructor with 10 years experience',
          hourlyRate: '20',
          location: 'Los Angeles',
          availability: 'Evenings',
          media: 'https://via.placeholder.com/600x400',
          mediaType: 'image',
          likes: 89,
          comments: 8,
          saved: false,
          timestamp: '3h ago'
        }
      ];
      setPosts(samplePosts);
    }
  }, [posts.length, loading]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Search Bar */}
      <div className="sticky top-0 bg-white z-10 pb-4">
        <input
          type="text"
          placeholder="Search skills..."
          className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.userAvatar}
                    alt={post.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{post.username}</p>
                    <p className="text-xs text-gray-500">{post.location}</p>
                  </div>
                </div>
                <div className="text-blue-600 font-semibold">
                  {post.hourlyRate} credits/hr
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4 border-t border-b">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.content}</p>
                
                {/* Availability */}
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <FaCalendar className="mr-2" />
                  <span>Available: {post.availability}</span>
                </div>

                {/* Book Button */}
                <Link
                  to={`/book/${post.userId}`}
                  className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Book Session
                </Link>
              </div>

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-1">
                      <FaHeart className="text-gray-500 hover:text-red-500" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1">
                      <FaComment className="text-gray-500" />
                      <span>{post.comments}</span>
                    </button>
                    <button>
                      <FaShare className="text-gray-500" />
                    </button>
                  </div>
                  <button>
                    <FaBookmark className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No skills found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSkills;
