import React, { useRef, useEffect, useState } from 'react';
import { User, Bot } from 'lucide-react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import "./Chat.css"

function Chat({ messages, showInitialDiv, generatedText, onMessageSubmit, hideInitialDiv }) {
  const [generatedHistory, setGeneratedHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  const chatEndRef = useRef(null);
  
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, generatedText]);

  useEffect(() => {
    if (generatedText) {
      setIsLoading(false);
      setGeneratedHistory(prevHistory => [...prevHistory, generatedText]);
    }
  }, [generatedText]);

  useEffect(() => {
    if (messages.length > generatedHistory.length) {
      setIsLoading(true); 
    }
  }, [messages, generatedHistory]);

function formatMessage(message) {
  const withoutAsterisks = message.replace(/\*\*/g, '');
  return withoutAsterisks.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
}


  return (
    <div className='chat'>

      {showInitialDiv && (
        <div className='initial'>
          <Bot className='initial_icon' style={{ width: '100px', height: '100px' }} />
          <h2>How can I help you today?</h2>
          <div className='suggestion'>
            <div className='s1' onClick={() => { onMessageSubmit('Kannur University location');hideInitialDiv();}}>Kannur University located</div>
            <div className='s1' onClick={() => { onMessageSubmit('Courses offered by Kannur University');hideInitialDiv();}}>Courses offered by University</div>
            <div className='s1' onClick={() => { onMessageSubmit('Examination Details of Kannur University');hideInitialDiv();}}>Examination Details of Kannur University</div>
            <div className='s1' onClick={() => { onMessageSubmit('Registration Details of KU');hideInitialDiv();}}>Registration Details of KU</div>
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
              <h1 className='res1'>{formatMessage(generatedHistory[index])}</h1>
            </div>
          )}
        </React.Fragment>
      ))}
      {isLoading && (
        <div className="loader">
          <SkeletonTheme className="skelton" baseColor="white" highlightColor="#35ac9c" height={100} >
            <p>
              <Skeleton className="skelton" count={1} />
            </p>
          </SkeletonTheme>
        </div>
      )}
      <div ref={chatEndRef}></div>
    </div>
  );
}

export default Chat;
