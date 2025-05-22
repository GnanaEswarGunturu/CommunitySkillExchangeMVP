import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaClock, FaCalendar, FaVideo, FaMapMarkerAlt } from 'react-icons/fa';

const BookingPage = () => {
  const { teacherId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: 1,
    mode: 'online',
    message: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      // Convert teacherId to number since URL params are strings
      const teacherData = users.find(u => u.id === parseInt(teacherId));
      if (teacherData) {
        setTeacher(teacherData);
      } else {
        setError('Teacher not found');
      }
    } catch (err) {
      setError('Failed to load teacher data');
    } finally {
      setLoading(false);
    }
  }, [teacherId]);

  const calculateCost = () => {
    return teacher ? teacher.hourlyRate * bookingData.duration : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (user.credits < calculateCost()) {
      setError('Insufficient credits');
      return;
    }

    try {
      // Create booking
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const newBooking = {
        id: Date.now(),
        teacherId: parseInt(teacherId),
        studentId: user.id,
        studentName: user.name,
        teacherName: teacher.name,
        status: 'pending',
        cost: calculateCost(),
        createdAt: new Date().toISOString(),
        ...bookingData
      };

      // Update bookings in localStorage
      bookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      // Update user credits
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          return { ...u, credits: u.credits - calculateCost() };
        }
        if (u.id === parseInt(teacherId)) {
          return { ...u, credits: u.credits + calculateCost() };
        }
        return u;
      });
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Update current user in context
      localStorage.setItem('user', JSON.stringify({
        ...user,
        credits: user.credits - calculateCost()
      }));

      // Redirect to profile or bookings page
      navigate('/profile');
    } catch (err) {
      setError('Failed to create booking');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Teacher not found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Teacher Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Book a Session with {teacher.name}</h2>
          <div className="space-y-4">
            <p className="text-gray-600">{teacher.bio}</p>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <span>{teacher.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-gray-500" />
              <span>{teacher.availability}</span>
            </div>
            <div className="font-semibold">
              Rate: {teacher.hourlyRate} credits/hour
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Book Your Session</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg"
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
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
                className="w-full p-3 border rounded-lg"
                value={bookingData.time}
                onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (hours)
              </label>
              <select
                className="w-full p-3 border rounded-lg"
                value={bookingData.duration}
                onChange={(e) => setBookingData({...bookingData, duration: parseInt(e.target.value)})}
              >
                <option value={1}>1 hour</option>
                <option value={2}>2 hours</option>
                <option value={3}>3 hours</option>
                <option value={4}>4 hours</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mode
              </label>
              <select
                className="w-full p-3 border rounded-lg"
                value={bookingData.mode}
                onChange={(e) => setBookingData({...bookingData, mode: e.target.value})}
              >
                <option value="online">Online</option>
                <option value="in-person">In Person</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message to Teacher
              </label>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows="4"
                value={bookingData.message}
                onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                placeholder="Describe what you want to learn..."
                required
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span>Total Cost:</span>
                <span className="font-bold">{calculateCost()} credits</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Your balance: {user.credits} credits
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              disabled={user.credits < calculateCost()}
            >
              Book Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
