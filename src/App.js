// App.js
import React, { useState } from 'react';
import "./App.css"
import Navbar from './Components/Navbar/Navbar';
import Chat from './Components/Chat/Chat';
import Prompt from './Components/Prompt/Prompt';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleMessageSubmit = (text) => {
    setMessages([...messages, text]);
  };

  return (
    <div className="App">
      <Navbar toggleSidebar={toggleSidebar} />
      {sidebarVisible && <Sidebar />}
      <Chat messages={messages}/>
      <Prompt onMessageSubmit={handleMessageSubmit} />
    </div>
  );
}

export default App;
