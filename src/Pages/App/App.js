import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from '../../Components/Navbar/Navbar';
import Chat from '../../Components/Chat/Chat';
import Prompt from '../../Components/Prompt/Prompt';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { jwtDecode } from 'jwt-decode';


function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showInitialDiv, setShowInitialDiv] = useState(true);
  const [generatedText, setGeneratedText] = useState('');
  const [threadId, setThreadId] = useState(null);
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [userid, setUserid] = useState('');


  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserid(decodedToken.id);
    }
  }, []);

  const handleMessageSubmit = async (text) => {
    setMessages([...messages, text]);

    if (!threadId) {
      try {
        const response = await fetch('http://192.168.18.14:3003/api/create-thread',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid }),
          });
        if (!response.ok) {
          throw new Error(`Failed to create thread: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Thread created with ID:', data.threadId);
        setThreadId(data.threadId);
      } catch (error) {
        console.error('Error creating thread:', error);
        return;
      }
    }

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
      setGeneratedText(data.text);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const hideInitialDiv = () => {
    setShowInitialDiv(false);
  };



  useEffect(() => {
    if (userid) {
      const fetchThreads = async () => {
        try {
          const response = await fetch(`http://192.168.18.14:3003/api/threads/messages/${userid}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch threads: ${response.statusText}`);
          }
          const data = await response.json();
          setThreads(data);
        } catch (error) {
          console.error('Error fetching threads:', error);
        }
      };

      fetchThreads();
    }
  }, [userid]);

  const onThreadClick = (thread) => {
    toggleSidebar()
    setShowInitialDiv(false);
    setCurrentThread(thread.data);
  };

  return (
    <div className="App">
      <Navbar toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />

      <Sidebar
        isOpen={sidebarVisible}
        threads={threads}
        onThreadClick={onThreadClick}
      />

      <Chat
        messages={messages}
        showInitialDiv={showInitialDiv}
        generatedText={generatedText}
        onMessageSubmit={handleMessageSubmit}
        hideInitialDiv={hideInitialDiv}
        currentThread={currentThread}
      />

      <Prompt
        onMessageSubmit={handleMessageSubmit}
        hideInitialDiv={hideInitialDiv}
      />
    </div>
  );
}

export default App;
