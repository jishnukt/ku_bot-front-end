// Chat.js
import React, { useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import "./Chat.css"

function Chat({ messages }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className='chat'>
      {messages.map((message, index) => (
        <div className='mytext' key={index}>
          <User className='user_icon' style={{ width: '18px', height: '18px'}}/>
          <h1 className='text1'>{message}</h1>
        </div>
      ))}
      <div ref={chatEndRef}></div>
    </div>
  );
}

export default Chat;
