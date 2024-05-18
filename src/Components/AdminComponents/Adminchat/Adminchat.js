import React, { useState, useEffect } from 'react';
import Chat from '../../../Components/Chat/Chat'
import Prompt from '../../../Components/Prompt/Prompt'

function Adminchat() {

    const [messages, setMessages] = useState([]);
    const [showInitialDiv, setShowInitialDiv] = useState(true);
    const [generatedText, setGeneratedText] = useState('');
  
  
  
    const handleMessageSubmit = async (text) => {
      setMessages([...messages, text]);
      try {
        const response = await fetch('http://192.168.18.14:3003/api/getGeneratedText', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: text }),
        });
        if (!response.ok) {
          throw new Error(`Failed to send message: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log('Data received from API:', data.text);
        setGeneratedText(data.text);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
  
    const hideInitialDiv = () => {
      setShowInitialDiv(false);
    };

    
  return (
    <div>
    <Chat messages={messages} showInitialDiv={showInitialDiv} generatedText={generatedText} onMessageSubmit={handleMessageSubmit} hideInitialDiv={hideInitialDiv} />
    <Prompt onMessageSubmit={handleMessageSubmit} hideInitialDiv={hideInitialDiv} />

    </div>
  )
}

export default Adminchat
