import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ClientNavbar = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('@user'));
  
    if (userData) {
      setUserName(userData.name);
      setImageUrl(userData.image|| 'https://via.placeholder.com/150');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('@token');
    localStorage.removeItem('@user');
    navigate('/Authentication/login');
  };

  return (
    <nav className="bg-indigo-900 shadow-lg w-full">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-white text-2xl font-semibold">
          FreelanceHub
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/client/clientdashboard" className="text-white hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/Jobs/Jobs" className="text-white hover:text-gray-300">
            Projects
          </Link>
          <Link to="/Freelancer/myProposal" className="text-white hover:text-gray-300">
            Proposals
          </Link>
          <Link to="/Jobs/addJob" className="text-white hover:text-gray-300">
            Post Job
         </Link>
       
          <button
            onClick={handleLogout}
            className="bg-white text-indigo-800 hover:bg-gray-200 py-2 px-4 rounded text-sm"
          >
            Logout
          </button>

          {/* User Info: Name and Profile Picture */}
          <div className="flex items-center space-x-2">
            <span className="text-white font-medium">Logged as {userName}</span>
            <img
               src={`http://localhost:5000/uploads/${imageUrl}`}
              alt="Profile"
              className="rounded-full w-10 h-10"
            />
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none">
            <span className="text-xl">&#9776;</span> {/* Hamburger icon */}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
