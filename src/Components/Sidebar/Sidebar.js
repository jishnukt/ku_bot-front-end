import React from 'react';
import { Cog,Moon,User,MessageSquare,History } from 'lucide-react';
import { Link } from "react-router-dom";
import './Sidebar.css';

function Sidebar({ isOpen ,messages,onMessageSubmit,toggleSidebar}) {

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
    </div>
  );
}

export default Sidebar;
