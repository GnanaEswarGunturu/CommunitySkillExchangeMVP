import { Link } from 'react-router-dom';
import { FaHandshake, FaBook, FaStar, FaUsers } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="text-center py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Community Skill Exchange
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Share your knowledge, learn new skills, and build meaningful connections 
          in your community through time-based exchanges.
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FaHandshake className="text-blue-600" size={32} />}
            title="Share Skills"
            description="Share your expertise with others in the community"
          />
          <FeatureCard
            icon={<FaBook className="text-blue-600" size={32} />}
            title="Learn Skills"
            description="Learn new abilities from experienced community members"
          />
          <FeatureCard
            icon={<FaStar className="text-blue-600" size={32} />}
            title="Earn Credits"
            description="Exchange one hour of teaching for one hour of learning"
          />
          <FeatureCard
            icon={<FaUsers className="text-blue-600" size={32} />}
            title="Build Community"
            description="Connect with like-minded people in your area"
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Create Your Profile"
              description="Sign up and list your skills and interests"
            />
            <StepCard
              number="2"
              title="Connect"
              description="Find community members with complementary skills"
            />
            <StepCard
              number="3"
              title="Exchange Skills"
              description="Start learning and teaching in time-based exchanges"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center p-6 rounded-xl hover:shadow-lg transition duration-300">
    <div className="flex justify-center mb-4">
      <div className="p-3 bg-blue-100 rounded-full">{icon}</div>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="text-center p-6">
    <div className="w-12 h-12 bg-blue-600 rounded-full text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;
