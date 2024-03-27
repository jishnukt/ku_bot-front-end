import React from 'react';
import { Cog } from 'lucide-react';
import { Moon } from 'lucide-react';
import './Sidebar.css';

function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className='darkmode'>
        <Moon />
        <p>Dark Mode</p>
      </div>
      <div className='settings'>
        <Cog />
        <p>Settings</p>
      </div>
    </div>
  );
}

export default Sidebar;
