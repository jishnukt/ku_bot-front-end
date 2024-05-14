import React, { useState, useEffect } from 'react';


function Admin() {
  const [likedStrings, setLikedStrings] = useState([]);
  const [dislikedStrings, setDisLikedStrings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3003/api/liked')
      .then(response => response.json())
      .then(data => setLikedStrings(data))
      .catch(error => console.error('Error fetching liked strings:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3003/api/disliked')
      .then(response => response.json())
      .then(data => setDisLikedStrings(data))
      .catch(error => console.error('Error fetching disliked strings:', error));
  }, []);


  return (
    <div>
      <h2>Liked Strings:</h2>
      <ul>
        {likedStrings.map((likedString, index) => (
          <li key={index}>Prompt: {likedString.prompt}, Disliked: {likedString.liked}</li>        
        ))}
      </ul>
      <h2>DisLiked Strings:</h2>
      <ul>
        {dislikedStrings.map((dislikedString, index) => (
          <li key={index}>Prompt: {dislikedString.prompt}, Disliked: {dislikedString.disliked}</li>        
      ))}
      </ul>
    </div>
    
  );
}


export default Admin
