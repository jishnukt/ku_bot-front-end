import React, { useEffect } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

const DarkMode = () => {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', theme);
  }, []);

  const setDarkmode = () => {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  };

  const setLightmode = () => {
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  };

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkmode();
    else setLightmode();
  };

  return (
    <div className='dark_mode'>
      <input
        className='dark_mode_input'
        type='checkbox'
        id='darkmode-toggle'
        onChange={toggleTheme}
        defaultChecked={localStorage.getItem('theme') === 'dark'}
      />
      <label className='dark_mode_label' htmlFor='darkmode-toggle'>
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
