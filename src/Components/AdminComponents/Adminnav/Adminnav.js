import React from 'react';
import { Menu } from 'lucide-react';
// import { SquarePlus } from 'lucide-react';
import "./Adminnav.css";

function Adminnav({ toggleSidebar }) {
  return (
<div className='navbar2'>
      <div className='menu-icon2' onClick={toggleSidebar}>
        <Menu style={{ backgroundColor: 'transparent', cursor: 'pointer', margin: '15px' }} />
      </div>
      {/* <div className='name'>
        <Bot style={{color:'white',background:'transparent',height:'50px'}}/>
        <h1 className='kubot'>KU_BOT</h1>
      </div> */}
      {/* <div className='add-icon'>
        <SquarePlus style={{ backgroundColor: 'transparent', cursor: 'pointer', margin: '15px' }} />
      </div> */}
    </div>
  )
}

export default Adminnav
