import React, { useRef, useEffect, useState } from 'react';
import { User, Bot } from 'lucide-react';
import "./Chat.css"

function Chat({ messages, showInitialDiv, generatedText }) {
  const [generatedHistory, setGeneratedHistory] = useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (generatedText) {
      setGeneratedHistory(prevHistory => [...prevHistory, generatedText]);
    }
  }, [generatedText]);

  return (
    <div className='chat'>
      {showInitialDiv && (
        <div className='initial'>
          <Bot className='initial_icon' style={{ width: '100px', height: '100px' }} />
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
        <React.Fragment key={index}>
          <div className='mytext'>
            <User className='user_icon' style={{ width: '18px', height: '18px' }} />
            <h1 className='text1'>{message}</h1>
          </div>
          {generatedHistory[index] && (
            <div className='myres'>
              <Bot className='user_icon' style={{ width: '18px', height: '18px' }} />
              <h1 className='res1'>{generatedHistory[index]}</h1>
            </div>
          )}
        </React.Fragment>
      ))}

      <div ref={chatEndRef}></div>
    </div>
  );
}

export default Chat;
