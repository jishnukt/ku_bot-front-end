// import React,{useState} from 'react'
// import { Bot } from 'lucide-react';
// import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import './Login.css'

// function Login() {

//   const [email, setEmail] = useState()
//   const [password, setPassword] = useState()
//   // const navigate = useNavigate()

//   // const handleSubmit = (e) => {
//   //   e.preventDefault()
//   //   axios.post('http://localhost:3001/login', {email, password })
//   //     .then(result => {
//   //       console.log(result)
//   //       if (result.data === "Success") {
//   //         navigate('/')
//   //       }
//   //     })
//   //     .catch(err => console.log(err))
//   // }

//   return (
//     <form className='box'>
//       <Bot className='bot'></Bot>
//       <input placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}></input>
//       <input placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
//       <button className='loginbtn'>Sign In</button>
//       <p>Don't have an account? <Link to='/Signup' style={{ color: '#00a193', fontWeight: 'bold' }}>Register</Link></p>
//     </form>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', { email, password });
      console.log(response.data); 
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form className='box' onSubmit={handleSubmit}>
      <Bot className='bot'></Bot>
      <input
        type='email'
        placeholder='Email Address'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='loginbtn'>Sign In</button>
      <p>Don't have an account? <Link to='/signup' style={{ color: '#00a193', fontWeight: 'bold' }}>Register</Link></p>
    </form>
  );
}

export default Login;
