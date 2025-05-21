import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: "🤝",
      title: "Share Skills",
      description: "Share your expertise with others in the community"
    },
    {
      icon: "📚",
      title: "Learn Skills",
      description: "Learn new abilities from experienced community members"
    },
    {
      icon: "⭐",
      title: "Earn Credits",
      description: "Exchange one hour of teaching for one hour of learning"
    },
    {
      icon: "🌟",
      title: "Build Community",
      description: "Connect with like-minded people in your area"
    }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Community Skill Exchange
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Share your knowledge, learn new skills, and build meaningful connections
          in your community through time-based exchanges.
        </p>
        <div className="space-x-4">
          {user ? (
            <Link to="/search" className="btn-primary">
              Find Skills
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn-secondary">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
        {features.map((feature, index) => (
          <div key={index} className="card text-center">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* How It Works Section */}
      <div className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <div className="text-2xl font-bold text-primary-600 mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
            <p className="text-gray-600">
              Sign up and list the skills you'd like to share with others.
            </p>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-primary-600 mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-600">
              Find people with the skills you want to learn and arrange exchanges.
            </p>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-primary-600 mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Exchange Skills</h3>
            <p className="text-gray-600">
              Meet up and share knowledge, earning time credits for your contributions.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">
          Ready to start sharing and learning?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join our community today and begin your skill exchange journey.
        </p>
        {!user && (
          <Link to="/register" className="btn-primary">
            Join Now
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
