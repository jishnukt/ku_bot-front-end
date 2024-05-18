import React, { useState, useEffect } from 'react';
import { User, Bot} from 'lucide-react';
import './Adminlike.css'


function Adminlike() {
    const [likedStrings, setLikedStrings] = useState([]);

    useEffect(() => {
        fetch('http://192.168.18.14:3003/api/liked')
            .then(response => response.json())
            .then(data => setLikedStrings(data))
            .catch(error => console.error('Error fetching liked strings:', error));
    }, []);


    return (
        <div className='chat'>
            {[...likedStrings].reverse().map((likedString, index) => (
                <div className='mytext'>
                    <User className='user_icon' style={{ width: '18px', height: '18px' }} />
                    <h1 className='text1'>{likedString.prompt}</h1>
                    <Bot className='user_icon' style={{ width: '18px', height: '18px' }} />
                    <h1 className='res1'>{likedString.liked}</h1>
                </div>
            ))}
        </div>
    )
}

export default Adminlike
