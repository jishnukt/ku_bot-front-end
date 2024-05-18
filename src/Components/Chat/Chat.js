import React, { useRef, useEffect, useState } from 'react';
import { User, Bot, ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import "./Chat.css"

function Chat({ messages, showInitialDiv, generatedText, onMessageSubmit, hideInitialDiv }) {
  const [generatedHistory, setGeneratedHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [likedIndexes, setLikedIndexes] = useState([]);
  const [dislikedIndexes, setDisLikedIndexes] = useState([]);
  const [likedMessages, setLikedMessages] = useState({});
  const [dislikedMessages, setDisLikedMessages] = useState({});
  const [copiedIndexes, setCopiedIndexes] = useState({});

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
    // const withoutBrackets = withoutAsterisks.replace(/\【.*?\】/g, '');
    const withoutBrackets = withoutAsterisks.replace(/【.*?】/g, '');
    return withoutBrackets.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }

  const handleThumbsUp = (index) => {
    if (!likedIndexes.includes(index)) {
      const liked = generatedHistory[index];
      const prompt = messages[index];

      fetch('http://127.0.0.1:3003/api/liked', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ liked, prompt }),
      })
        .then(response => {
          if (response.ok) {
            console.log('Like Sent successfully');
            setLikedIndexes([...likedIndexes, index]);
            setLikedMessages(prevLikedMessages => ({
              ...prevLikedMessages,
              [index]: true,
            }));
          } else {
            console.error('Error sending Like:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error sending Like:', error);
        });
    } else {
      console.log('Already liked this text');
    }
  };

  const handleThumbsDown = (index) => {
    if (!dislikedIndexes.includes(index)) {
      const disliked = generatedHistory[index];
      const prompt = messages[index];
      fetch('http://127.0.0.1:3003/api/disliked', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ disliked, prompt }),
      })
        .then(response => {
          if (response.ok) {
            console.log('DisLike Sent successfully');
            setDisLikedIndexes([...dislikedIndexes, index]);
            setDisLikedMessages(prevDisLikedMessages => ({
              ...prevDisLikedMessages,
              [index]: true,
            }));
          } else {
            console.error('Error sending DisLike:', response.statusText);
          }
        })
        .catch(error => {
          console.error('Error sending Dislike:', error);
        });
    } else {
      console.log('Already liked this text');
    }
  };

  const handleCopy = (index) => {
    const textToCopy = generatedHistory[index];
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied successfully');
        setCopiedIndexes(prevCopiedIndexes => ({
          ...prevCopiedIndexes,
          [index]: true,
        }));
      })
      .catch(error => {
        console.error('Error copying text:', error);
      });
  };



  return (
    <div className='chat'>

      {showInitialDiv && (
        <div className='initial'>
          <Bot className='initial_icon' style={{ width: '100px', height: '100px' }} />
          <h2>How can I help you today?</h2>
          <div className='suggestion'>
            <div className='s1' onClick={() => { onMessageSubmit('Kannur University location'); hideInitialDiv(); }}>Kannur University located</div>
            <div className='s1' onClick={() => { onMessageSubmit('Courses offered by Kannur University'); hideInitialDiv(); }}>Courses offered by University</div>
            <div className='s1' onClick={() => { onMessageSubmit('Examination Details of Kannur University'); hideInitialDiv(); }}>Examination Details of Kannur University</div>
            <div className='s1' onClick={() => { onMessageSubmit('Registration Details of KU'); hideInitialDiv(); }}>Registration Details of KU</div>
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
            <div className='response'>
              <div className='myres'>
                <Bot className='user_icon' style={{ width: '18px', height: '18px' }} />
                <h1 className='res1'>{formatMessage(generatedHistory[index])}</h1>
              </div>
              <div className='thumbs'>
                <ThumbsUp className={likedMessages[index] ? 'up red' : 'up'} onClick={() => handleThumbsUp(index)} />
                {copiedIndexes[index] ? (
                  <span className="copied">
                    <Check style={{ backgroundColor: 'white' }} />
                  </span>
                ) : (
                  <Copy className='copy' onClick={() => handleCopy(index)} />
                )}                
                <ThumbsDown className={dislikedMessages[index] ? 'up red' : 'down'} onClick={() => handleThumbsDown(index)} />
              </div>
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
