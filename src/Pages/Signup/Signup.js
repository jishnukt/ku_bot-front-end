// import React, { useState } from 'react'
// import { Bot } from 'lucide-react';
// import { Link } from "react-router-dom";
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
// import './Signup.css'

// function Signup() {
//   const [fname, setFname] = useState()
//   const [lname, setLname] = useState()
//   const [email, setEmail] = useState()
//   const [password, setPassword] = useState()
//   const navigate = useNavigate()

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://127.0.0.1:3001/signup', { fname, lname, email, password })
//       .then(result => {
//         console.log(result);
//         navigate('/login');
//       })
//       .catch(err => console.log(err));
//   };


//   return (
//     <form className='box2' onSubmit={handleSubmit} action='POST'>
//       <Bot className='bot2'></Bot>
//       <input placeholder='First Name' onChange={(e) => setFname(e.target.value)}></input>
//       <input placeholder='Last Name' onChange={(e) => setLname(e.target.value)}></input>
//       <input placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}></input>
//       <input placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
//       <button className='signupbtn'>Sign Up</button>
//       <p>Already have an account? <Link to='/login' style={{ color: '#00a193', fontWeight: 'bold' }}>Sign In</Link></p>
//     </form>
//   )
// }

// export default Signup

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'User'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.18.14:3003/api/signup', formData);
      console.log(response.data); 
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <form className='box2' onSubmit={handleSubmit}>
      <Bot className='bot2'></Bot>
      <input
        type='text'
        name='firstName'
        placeholder='First Name'
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        type='text'
        name='lastName'
        placeholder='Last Name'
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type='email'
        name='email'
        placeholder='Email Address'
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={formData.password}
        onChange={handleChange}
      />
      <button className='signupbtn'>Sign Up</button>
      <p>
        Already have an account?{' '}
        <Link to='/login' style={{ color: '#00a193', fontWeight: 'bold' }}>
          Sign In
        </Link>
      </p>
    </form>
  );
}

export default Signup;
