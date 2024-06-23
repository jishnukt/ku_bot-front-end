import React, { useRef, useEffect, useState } from 'react';
import { User, Bot, ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./Chat.css";

function Chat({ messages, showInitialDiv, generatedText, onMessageSubmit, hideInitialDiv, currentThread }) {
  const [generatedHistory, setGeneratedHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [likedIndexes, setLikedIndexes] = useState([]);
  const [dislikedIndexes, setDislikedIndexes] = useState([]);
  const [likedMessages, setLikedMessages] = useState({});
  const [dislikedMessages, setDislikedMessages] = useState({});
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
    if (typeof message !== 'string') {
      return null;
    }
    const withoutAsterisks = message.replace(/\*\*/g, '');
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
            setDislikedIndexes([...dislikedIndexes, index]);
            setDislikedMessages(prevDislikedMessages => ({
              ...prevDislikedMessages,
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

  const renderChatContent = () => {
    if (currentThread) {
      return currentThread.prompt.map((prompt, index) => (
        <React.Fragment key={index}>
          <div className='mytext'>
            <User className='user_icon' style={{ width: '18px', height: '18px' }} />
            <h1 className='text1'>{prompt}</h1>
          </div>

          {currentThread.response[index] && (
            <div className='response'>
              <div className='myres'>
                <Bot className='user_icon' style={{ width: '18px', height: '18px' }} />
                <h1 className='res1'>{formatMessage(currentThread.response[index])}</h1>
              </div>
              {/* <div className='thumbs'>
                <ThumbsUp className={likedIndexes.includes(index) ? 'up red' : 'up'} onClick={() => handleThumbsUp(index)} />
                {copiedIndexes[index] ? (
                  <span className="copied">
                    <Check style={{ backgroundColor: 'white' }} />
                  </span>
                ) : (
                  <Copy className='copy' onClick={() => handleCopy(index)} />
                )}
                <ThumbsDown className={dislikedIndexes.includes(index) ? 'up red' : 'down'} onClick={() => handleThumbsDown(index)} />
              </div> */}
            </div>
          )}
        </React.Fragment>
      ));
    }
    
    return messages.map((message, index) => (
      <React.Fragment key={index}>
        <div className='mytext'>
          <User className='user_icon' style={{ width: '18px', height: '18px' }} />
          <h1 className='text1'>{message}</h1>
        </div>

        {isLoading && index === messages.length - 1 && (
          <div className='loader'>
            <SkeletonTheme className="skelton"  baseColor="#d4f8e4" highlightColor="#35ac9c" height={100}>
              <Skeleton className='skelton' count={1} />
            </SkeletonTheme>
          </div>
        )}

        {generatedHistory[index] && (
          <div className='response'>
            <div className='myres'>
              <Bot className='user_icon' style={{ width: '18px', height: '18px' }} />
              <h1 className='res1'>{formatMessage(generatedHistory[index])}</h1>
            </div>
            <div className='thumbs'>
              <ThumbsUp className={likedIndexes.includes(index) ? 'up red' : 'up'} onClick={() => handleThumbsUp(index)} />
              {copiedIndexes[index] ? (
                <span className="copied">
                  <Check/>
                </span>
              ) : (
                <Copy className='copy' onClick={() => handleCopy(index)} />
              )}
              <ThumbsDown className={dislikedIndexes.includes(index) ? 'up red' : 'down'} onClick={() => handleThumbsDown(index)} />
            </div>
          </div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className='chat'>
      {showInitialDiv && (
        <div className='initial'>
          <Bot className='initial_icon' style={{ width: '100px', height: '100px' }} />
          <h2>How can I help you today?</h2>
          <div className='suggestion'>
            {['Kannur University location', 'Courses offered by Kannur University', 'Examination Details', 'Registration Details of KU'].map((suggestion, index) => (
              <div key={index} className='s1' onClick={() => { onMessageSubmit(suggestion); hideInitialDiv(); }}>
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      )}

      {renderChatContent()}

      <div ref={chatEndRef}></div>
    </div>
  );
}

export default Chat;
