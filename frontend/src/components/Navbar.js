import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-600' : 'text-gray-600';
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600">
                Skill Exchange
              </h1>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 
                ${isActive('/') ? 'border-primary-500' : 'border-transparent'}`}
              >
                Home
              </Link>
              <Link
                to="/search"
                className={`inline-flex items-center px-1 pt-1 border-b-2 
                ${isActive('/search') ? 'border-primary-500' : 'border-transparent'}`}
              >
                Search Skills
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <>
                <Link
                  to="/add-skill"
                  className="btn-primary mr-4"
                >
                  Share Skill
                </Link>
                <div className="relative ml-3">
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/profile"
                      className={`text-sm font-medium ${isActive('/profile')}`}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-sm font-medium text-gray-600 hover:text-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`text-sm font-medium ${isActive('/login')}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`text-sm font-medium ${isActive('/register')}`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
