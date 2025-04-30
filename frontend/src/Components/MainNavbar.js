import React from 'react';
import { ClientNavbar, FreelancerNavbar, AdminNavbar } from '../Components/Navbar';

const MainNavbar = () => {
  const role = JSON.parse(localStorage.getItem("@user"))?.role;
 // const role = localStorage.getItem('role');
  console.log(role);

  if (role === 'freelancer') return <FreelancerNavbar />;
  if (role === 'admin') return <AdminNavbar />;
  if ((role === 'client') || (!role)) return <ClientNavbar />;
  
};

export default MainNavbar;

