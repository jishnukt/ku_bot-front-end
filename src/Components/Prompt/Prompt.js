import React, { useState } from 'react';
import { SquareArrowUp } from 'lucide-react';
import "./Prompt.css";

function Prompt({ onMessageSubmit, hideInitialDiv }) {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter' && inputText.trim() !== '') {
      onMessageSubmit(inputText);
      setInputText('');
      hideInitialDiv(); 
    }
  };

  const handleArrowClick = () => {
    if (inputText.trim() !== '') {
      onMessageSubmit(inputText);
      setInputText('');
      hideInitialDiv(); 
    }
  };

  return (
    <div className='prompt'>
      <div className='prompt-container'>
        <input
          className='search'
          placeholder='Enter Message'
          type='text'
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
        />
        <div className='icon-container'>      
          <SquareArrowUp
            style={{color:'#00a193',backgroundColor:'white',cursor:'pointer'}}
            onClick={handleArrowClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Prompt;
