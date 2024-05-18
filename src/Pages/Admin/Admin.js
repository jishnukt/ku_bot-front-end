import React, { useState} from 'react';
import './Admin.css'
import Adminsidebar from '../../Components/AdminComponents/Adminsidebar/Adminsidebar'
import Adminnav from '../../Components/AdminComponents/Adminnav/Adminnav'
import Adminlike from '../../Components/AdminComponents/Adminlike/Adminlike'
import Adminchat from '../../Components/AdminComponents/Adminchat/Adminchat'
import { Route, Routes } from 'react-router-dom';
import Admindislike from '../../Components/AdminComponents/Admindislike/Admindislike'
import Adminsettings from '../../Components/AdminComponents/Adminsettings/Adminsettings'



function Admin() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <div className='admin'>
        <Adminnav toggleSidebar={toggleSidebar} />
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


export default Admin
