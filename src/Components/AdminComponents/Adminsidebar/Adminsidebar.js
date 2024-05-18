import React from 'react';
import { Moon,ThumbsUp,ThumbsDown,MessageCircle,Settings,LogOut } from 'lucide-react';
import './Adminsidebar.css';
import { Link } from "react-router-dom";


function Adminsidebar({ isOpen }) {
  return (
    <div className={`sidebar2 ${isOpen ? 'open' : ''}`}>
      <div className='recent2'>
        <div className='sidefooter2'>
          <div className='darkmode2'>
            <ThumbsUp />
            <p className='dm2'><Link style={{ textDecoration: 'none' }} to='/admin/likes'>Likes</Link></p>
          </div>
          <div className='darkmode2'>
            <ThumbsDown />
            <p className='dm2'><Link style={{ textDecoration: 'none' }} to='/admin/dislikes'>DisLikes</Link></p>
          </div>
          <div className='darkmode2'>
            <MessageCircle />
            <p className='dm2'><Link style={{ textDecoration: 'none' }} to='/admin/chat'>Chat</Link></p>
          </div>
          <div className='darkmode2'>
            <Settings />
            <p className='dm2'><Link style={{ textDecoration: 'none' }} to='/admin/settings'>Settings</Link></p>
          </div>
          <div className='darkmode2'>
            <LogOut />
            <p className='dm2'><Link style={{ textDecoration: 'none' }} to='/login'>Sign Out</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminsidebar;
