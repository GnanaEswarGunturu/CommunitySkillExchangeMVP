import { useState, useEffect } from 'react';
import { FaHeart, FaComment, FaShare, FaBookmark } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const SearchSkills = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    // Simulate posts data - in real app, this would come from localStorage
    const samplePosts = [
      {
        id: 1,
        userId: 'user1',
        username: 'john_doe',
        userAvatar: 'https://via.placeholder.com/40',
        title: 'Guitar Lessons for Beginners',
        content: 'Learn guitar basics with easy-to-follow lessons',
        media: 'https://via.placeholder.com/600x400',
        mediaType: 'video',
        likes: 124,
        comments: 15,
        saved: false,
        timestamp: '2h ago'
      },
      // Add more sample posts
    ];
    setPosts(samplePosts);
  }, []);

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
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={post.userAvatar}
                  alt={post.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{post.username}</p>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>
              <button className="text-gray-500">•••</button>
            </div>

            {/* Post Media */}
            <div className="relative">
              {post.mediaType === 'video' ? (
                <video
                  controls
                  className="w-full h-[600px] object-cover"
                  src={post.media}
                />
              ) : (
                <img
                  src={post.media}
                  alt={post.title}
                  className="w-full h-[600px] object-cover"
                />
              )}
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

              {/* Post Content */}
              <div>
                <h3 className="font-semibold mb-1">{post.title}</h3>
                <p className="text-gray-600">{post.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSkills;
