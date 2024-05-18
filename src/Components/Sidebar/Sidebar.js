import React from 'react';
import { Cog,Moon,User,MessageSquare,History,LogOut,LogIn } from 'lucide-react';
import { Link } from "react-router-dom";
import './Sidebar.css';
import axios from 'axios'
import { useLocation } from 'react-router-dom';

function Sidebar({ isOpen ,messages,onMessageSubmit,toggleSidebar}) {
  const location = useLocation();
  const { email } = location.state || {}; // Use destructuring with default value

  // const handleName = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://127.0.0.1:3003/api/login', {
  //       email: {email},
  //       password: {password}
  //     });
  //     console.log(response.data.user.fullName);
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  // };

  return (
    
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className='recent'>
        <div className='recenthead'><History className='historyicon'/>Recent</div> 
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
      {email ? (
          <div className='loginorsignup'>
            <User className='usericon1' />
            <p className='set'>{email}</p>
          </div>
        ) : (
          <div className='loginorsignup'>
            <User className='usericon1' />
            <p className='set'>Guest User</p>
          </div>
        )}
      {email ? (
          <div className='loginorsignup'>
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
