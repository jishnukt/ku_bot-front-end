import React, { useState, useEffect } from 'react';
import { Moon, User, MessageSquare, History, LogOut, LogIn } from 'lucide-react';
import { Link } from "react-router-dom";
import './Sidebar.css';
import { jwtDecode } from 'jwt-decode';

// import { useLocation } from 'react-router-dom';

function Sidebar({ isOpen, messages, onMessageSubmit, toggleSidebar }) {
  // const location = useLocation();
  // const { email } = location.state || {}; // Use destructuring with default value
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.userType == 'User') {
        setFullName(decodedToken.fullName);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };



  return (

    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className='recent'>
        <div className='recenthead'><History className='historyicon' />Recent</div>
        <div className='recenttail'>
          {messages.map((message, index) => (
            <div className='history' onClick={() => { onMessageSubmit(message); toggleSidebar(); }} key={index}>
              <MessageSquare className='messagesquare'></MessageSquare>
              <p className='set set2'>{message}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='sidefooter'>
        {fullName ? (
          <div className='loginorsignup'>
            <User className='usericon1' />
            <p className='set'>{fullName}</p>
          </div>
        ) : (
          <div className='loginorsignup'>
            <User className='usericon1' />
            <p className='set'>Guest User</p>
          </div>
        )}
        {fullName ? (
          <div className='loginorsignup' onClick={handleLogout}>
            <LogOut className='usericon1' />
            <p className='set'>Logout</p>
          </div>
        ) : (
          <div className='loginorsignup'>
            <LogIn className='usericon1' />
            <p className='set'><Link style={{ textDecoration: 'none' }} to='/Login'>Login / Register</Link></p>
          </div>
        )}
        <div className='darkmode' >
          <Moon />
          <p className='dm'>Dark Mode</p>
        </div>
        {/* <div className='settings'>
          <Cog />
          <p className='set'>Settings</p>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
