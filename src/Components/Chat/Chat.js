import React, { useRef, useEffect } from 'react';
import { User, Bot } from 'lucide-react'; 
import "./Chat.css"

function Chat({ messages, showInitialDiv }) { 
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className='chat'>
      {showInitialDiv && ( 
        <div className='initial'>
          <Bot className='initial_icon' style={{ width: '100px', height: '100px'}}/>
          <h2>How can I help you today?</h2>
          <div className='suggestion'>
            <div className='s1'>Kannur University located</div>
            <div className='s1'>Courses offered by University</div>
            <div className='s1'>Calender Year</div>
            <div className='s1'>Fees Structures</div>
          </div>
        </div>
      )}
      {messages.map((message, index) => (
        <div className='mytext' key={index}>
          <User className='user_icon' style={{ width: '18px', height: '18px'}}/>
          <h1 className='text1'>{message}</h1>
        </div>
      ))}
      <div className='myres'>
        <Bot className='user_icon' style={{ width: '18px', height: '18px'}}/>
        <h1 className='res1'></h1>
      </div>
      <div ref={chatEndRef}></div>
    </div>
  );
}

export default Chat;
