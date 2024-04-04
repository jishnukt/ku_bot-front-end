import React from 'react'
import { User, Bot } from 'lucide-react';
import { Link } from "react-router-dom";
import './Signup.css'

function Signup() {
  return (
    <div className='box2'>
        <Bot className='bot2'></Bot>
        <input placeholder='First Name'></input>
        <input placeholder='Last Name'></input>
        <input placeholder='Email Address'></input>
        <input placeholder='Password'></input>
        <button className='signupbtn'>Sign Up</button>
        <p>Already have an account? <Link to='/login' style={{color:'#00a193',fontWeight:'bold'}}>Sign In</Link></p>
    </div>
  )
}

export default Signup
