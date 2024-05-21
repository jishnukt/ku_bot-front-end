import React, { useState, useEffect } from 'react';
import { User, Bot} from 'lucide-react';
import './Admindislike.css'

function Admindislike() {
    const [dislikedStrings, setDisLikedStrings] = useState([]);

    useEffect(() => {
        fetch('http://192.168.18.14:3003/api/disliked')
            .then(response => response.json())
            .then(data => setDisLikedStrings(data))
            .catch(error => console.error('Error fetching disliked strings:', error));
    }, []);

    return (
        <div className='chat'>
            {[...dislikedStrings].reverse().map((dislikedString, index) => (
                <div className='mytext'>
                    <h1 className='text1'>{dislikedString.prompt}</h1>
                    <h1 className='res1'>{dislikedString.disliked}</h1>
                    <User className='user_icon' style={{ width: '18px', height: '18px' }} />
                </div>
            ))}

        </div>
    )
}

export default Admindislike
