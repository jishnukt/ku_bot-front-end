import React, { useState } from 'react';
import './Admin.css';
import Adminsidebar from '../../Components/AdminComponents/Adminsidebar/Adminsidebar';
import Adminnav from '../../Components/AdminComponents/Adminnav/Adminnav';
import Adminlike from '../../Components/AdminComponents/Adminlike/Adminlike';
import Adminchat from '../../Components/AdminComponents/Adminchat/Adminchat';
import { Route, Routes, Navigate } from 'react-router-dom';
import Admindislike from '../../Components/AdminComponents/Admindislike/Admindislike';
import Adminsettings from '../../Components/AdminComponents/Adminsettings/Adminsettings';
import {jwtDecode} from 'jwt-decode';

function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const storedToken = localStorage.getItem('token');
  let decodedToken = null;

  try {
    if (storedToken) {
      decodedToken = jwtDecode(storedToken);
    }
  } catch (error) {
    console.error('Invalid token:', error);
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!storedToken || !decodedToken || decodedToken.userType !== 'Admin') {
    return <Navigate to="/login" />;
  }

  return (
    <div className='admin'>
      <Adminnav toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
      <Adminsidebar isOpen={isSidebarOpen} />
      <div className="admincontents">
        <Routes path='/admin'>
          <Route path='/chat' element={<Adminchat />} />
          <Route path='/likes' element={<Adminlike />} />
          <Route path='/dislikes' element={<Admindislike />} />
          <Route path='/settings' element={<Adminsettings />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
