import React from 'react';
import { Moon, ThumbsUp, ThumbsDown, MessageCircle, Settings, LogOut } from 'lucide-react';
import './Adminsidebar.css';
import { Link, useLocation } from "react-router-dom";

function Adminsidebar({ isOpen }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar2 ${isOpen ? 'open' : ''}`}>
      <div className='recent2'>
        <div className='sidefooter2'>
          <div className={`darkmode2 c ${isActive('/admin/likes') ? 'active' : ''}`}>
            <ThumbsUp />
            <p className='dm2'><Link style={{ textDecoration: 'none' }} to='/admin/likes'>Likes</Link></p>
          </div>
          <div className={`darkmode2 c ${isActive('/admin/dislikes') ? 'active' : ''}`}>
            <ThumbsDown />
            <p className='dm2'><Link style={{ textDecoration: 'none' }} to='/admin/dislikes'>DisLikes</Link></p>
          </div>
          <div className={`darkmode2 c ${isActive('/admin/chat') ? 'active' : ''}`}>
            <MessageCircle />
            <p className='dm2'><Link style={{ textDecoration: 'none' }} to='/admin/chat'>Chat</Link></p>
          </div>
          <div className={`darkmode2 c ${isActive('/admin/settings') ? 'active' : ''}`}>
            <Settings />
            <p className='dm2'><Link style={{ textDecoration: 'none' }} to='/admin/settings'>Settings</Link></p>
          </div>
          <div className={`darkmode2 c ${isActive('/login') ? 'active' : ''}`}>
            <LogOut />
            <p className='dm2'><Link style={{ textDecoration: 'none' }} to='/login'>Sign Out</Link></p>
          </div>
          <div className={`darkmode2 c ${isActive('/login') ? 'active' : ''}`}>
            <Moon />
            <p className='dm2'><Link style={{ textDecoration: 'none' }} to=''>Dark Mode</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminsidebar;
