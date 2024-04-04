import React from 'react';
import { Cog,Moon,User } from 'lucide-react';
import { Link } from "react-router-dom";
import './Sidebar.css';

function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className='loginorsignup'>
        <User className='usericon1' />
        <p className='set'><Link style={{textDecoration:'none'}} to='/Login'>Login / Register</Link></p>
      </div>
      <div className='darkmode'>
        <Moon />
        <p className='dm'>Dark Mode</p>
      </div>
      <div className='settings'>
        <Cog />
        <p className='set'>Settings</p>
      </div>
    </div>
  );
}

export default Sidebar;
