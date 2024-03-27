import React, { useState } from 'react';
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import Chat from './Components/Chat/Chat';
import Prompt from './Components/Prompt/Prompt';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showInitialDiv, setShowInitialDiv] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleMessageSubmit = (text) => {
    setMessages([...messages, text]);
  };

  const hideInitialDiv = () => {
    setShowInitialDiv(false);
  };

  return (
    <div className="App">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarVisible} /> {/* Pass sidebar visibility state */}
      <Chat messages={messages} showInitialDiv={showInitialDiv} />
      <Prompt onMessageSubmit={handleMessageSubmit} hideInitialDiv={hideInitialDiv} />
    </div>
  );
}

export default App;
