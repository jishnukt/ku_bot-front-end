import React, { useState} from 'react';
import './App.css';
import Navbar from '../../Components/Navbar/Navbar';
import Chat from '../../Components/Chat/Chat';
import Prompt from '../../Components/Prompt/Prompt';
import Sidebar from '../../Components/Sidebar/Sidebar';



function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showInitialDiv, setShowInitialDiv] = useState(true);
  const [generatedText, setGeneratedText] = useState('');

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleMessageSubmit = async (text) => {
    setMessages([...messages, text]);
    try {
      const response = await fetch('http://localhost:3001/api/getGeneratedText', {
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
      console.log('Data received from API:', data.text);
      setGeneratedText(data.text);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const hideInitialDiv = () => {
    setShowInitialDiv(false);
  };

  return (
    <div className="App">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarVisible} messages={messages} onMessageSubmit={handleMessageSubmit} toggleSidebar={toggleSidebar} />
      <Chat messages={messages} showInitialDiv={showInitialDiv} generatedText={generatedText} onMessageSubmit={handleMessageSubmit} hideInitialDiv={hideInitialDiv} />
      <Prompt onMessageSubmit={handleMessageSubmit} hideInitialDiv={hideInitialDiv} />
    </div>
  );
}

export default App;
