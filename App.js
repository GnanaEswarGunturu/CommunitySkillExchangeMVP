import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SearchSkills from './pages/SearchSkills';
import ExchangeForm from './pages/ExchangeForm';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <Link to="/" className="py-4 px-2 hover:text-blue-500">Home</Link>
                <Link to="/search" className="py-4 px-2 hover:text-blue-500">Search Skills</Link>
                <Link to="/exchange" className="py-4 px-2 hover:text-blue-500">Exchange Skills</Link>
              </div>
              <div className="flex space-x-4">
                <Link to="/login" className="py-4 px-2 hover:text-blue-500">Login</Link>
                <Link to="/register" className="py-4 px-2 hover:text-blue-500">Register</Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto mt-8 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchSkills />} />
            <Route path="/exchange" element={<ExchangeForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
