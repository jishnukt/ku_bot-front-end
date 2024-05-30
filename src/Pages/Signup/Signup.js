import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import DarkMode from '../../Components/DarkMode/DarkMode';


function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'User'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.firstName) formErrors.firstName = "First Name is required";
    if (!formData.lastName) formErrors.lastName = "Last Name is required";
    if (!formData.email) {
      formErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email Address is invalid";
    }
    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
    }
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post('http://192.168.18.14:3003/api/signup', formData);
        console.log(response.data);
        navigate('/login');
      } catch (error) {
        console.error('Signup failed:', error);
        setErrors({ apiError: 'Signup failed, please try again' });
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <form className='box2' onSubmit={handleSubmit}>
      <Bot className='bot2'></Bot>
      {errors.apiError && <p className="error">{errors.apiError}</p>}
      <input
        type='text'
        name='firstName'
        placeholder='First Name'
        value={formData.firstName}
        onChange={handleChange}
      />
      {errors.firstName && <p className="error">{errors.firstName}</p>}
      <input
        type='text'
        name='lastName'
        placeholder='Last Name'
        value={formData.lastName}
        onChange={handleChange}
      />
      {errors.lastName && <p className="error">{errors.lastName}</p>}
      <input
        type='email'
        name='email'
        placeholder='Email Address'
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <button className='signupbtn'>Sign Up</button>
      <p>
        Already have an account?{' '}
        <Link to='/login' style={{ color: '#00a193', fontWeight: 'bold' }}>
          Sign In
        </Link>
      </p>
      <div className='v'>
        <DarkMode/>
      </div>
    </form>
  );
}

export default Signup;
