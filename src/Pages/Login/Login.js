import React from 'react'
import { User, Bot } from 'lucide-react';
import { Link } from "react-router-dom";
import './Login.css'

function Login() {
  return (
    <div className='box'>
        <Bot className='bot'></Bot>
        <input placeholder='Email Address'></input>
        <input placeholder='Password'></input>
        <button className='loginbtn'>Sign In</button>
        <p>Don't have an account? <Link to='/Signup' style={{color:'#00a193',fontWeight:'bold'}}>Register</Link></p>
    </div>
  )
}

export default Login
