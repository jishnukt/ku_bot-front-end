import React, { useState, useEffect } from 'react';
import { User, MessageSquare, History, LogOut, LogIn } from 'lucide-react';
import { Link } from "react-router-dom";
import './Sidebar.css';
import { jwtDecode } from 'jwt-decode';
import DarkMode from '../DarkMode/DarkMode';

function Sidebar({ isOpen, threads, onThreadClick }) {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.userType === 'User') {
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
        <div className='recenthead'>
          <History className='historyicon' />Recent
        </div>
        <div className="hh">
          {fullName ? (
            <div className='recenttail'>
              {
                Array.isArray(threads) && threads.length > 0 ? (
                  threads.map((thread, index) => (
                    <div className='history' onClick={() => onThreadClick(thread)} key={thread.threadId}>
                      <MessageSquare className='messagesquare' />
                      <p className='set set2'>
                        {thread.data.prompt.length > 0 ? thread.data.prompt[0] : "No prompts yet"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No Chat History Available</p>
                )
              }
            </div>
          ) : (
            <p className='set2 f'>No History for Guest Users</p>
          )}
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
            <p className='set'>
              <Link style={{ textDecoration: 'none' }} to='/Login'>Login / Register</Link>
            </p>
          </div>
        )}
        {/* <div className='darkmode'>
          <Moon />
          <p className='dm'>Dark Mode</p>
        </div> */}
        <DarkMode />
      </div>
    </div>
  );
}

export default Sidebar;
