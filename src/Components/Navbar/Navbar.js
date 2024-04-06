// Navbar.js
import React from 'react';
import { Menu } from 'lucide-react';
import { SquarePlus } from 'lucide-react';
import "./Navbar.css";

function Navbar({ toggleSidebar }) {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className='navbar'>
      <div className='menu-icon' onClick={toggleSidebar}>
        <Menu style={{ backgroundColor: 'transparent', cursor: 'pointer', margin: '15px' }} />
      </div>
      <div className='name'>
        <h1 className='kubot'>KU_BOT</h1>
      </div>
      <div className='add-icon' onClick={refreshPage}>
        <SquarePlus style={{ backgroundColor: 'transparent', cursor: 'pointer', margin: '15px' }} />
      </div>
    </div>
  );
}

export default Navbar;
