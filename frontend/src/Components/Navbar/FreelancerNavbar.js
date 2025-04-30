
import  { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FreelancerNavbar = () => {
  const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');
    const [userName, setUserName] = useState('');
  
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('@user'));
      console.log("User info:", userData);
      if (userData) {
        setUserName(userData.name);
        setImageUrl(userData.image || 'https://via.placeholder.com/150');
      }
    }, []);

  const handleLogout = () => {
    localStorage.removeItem('@token');
    localStorage.removeItem('@user');
    navigate('/Authentication/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-green-800 px-4 shadow-md">
      <Link className="navbar-brand text-white text-2xl font-bold" to="/">FreelanceHub</Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#freelancerNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="freelancerNavbar">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link text-white hover:text-gray-300 transition-all" to="/freelancer/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover:text-gray-300 transition-all" to="/Jobs/Jobs">Browse Jobs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover:text-gray-300 transition-all" to="/Freelancer/getMessages">Inbox</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover:text-gray-300 transition-all" to="/freelancer/my-bids">My Bids</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover:text-gray-300 transition-all" to="/freelancer/my-work">My Work</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white hover:text-gray-300 transition-all" to="/freelancer/free-credit">Free Credit</Link>
          </li>

          {/* Account dropdown */}
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle text-white hover:text-gray-300 transition-all" href="#" role="button" data-bs-toggle="dropdown">
              Account
            </Link>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><Link className="dropdown-item" to="/freelancer/profile">Profile</Link></li>
              <li><Link className="dropdown-item" to="/freelancer/wallet">Wallet</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default FreelancerNavbar;







