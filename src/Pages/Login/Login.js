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
      const response = await axios.post('http://192.168.18.14:3003/api/login', { email, password });
      console.log(response.data.user.fullName); 
      if (response.data.user.type === 'User') {
        navigate('/user',{ state: { email } });
      } else if (response.data.user.type === 'Admin') {
        navigate('/admin/chat');
      }    
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
