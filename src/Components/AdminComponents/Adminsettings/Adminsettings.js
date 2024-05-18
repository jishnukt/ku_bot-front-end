import React from 'react'
import './Adminsettings.css'
import { User, Bot, SquareArrowUp, SendHorizontal,Upload } from 'lucide-react';


function Adminsettings() {
    return (
        <div className='chat'>
            <div className='prompt-container'>
                <p className='settitle'>BOT NAME</p>
                <input className='search' type='text' />
                <div className='icon-container'>
                    <SendHorizontal style={{ color: '#00a193', backgroundColor: 'transparent', cursor: 'pointer' }} />
                </div>
                <div>.</div>
            </div>
            <div className='prompt-container'>
                <p className='settitle'>INSTRUCTIONS</p>
                <input className='search' type='text' />
                <div className='icon-container'>
                    <SendHorizontal style={{ color: '#00a193', backgroundColor: 'transparent', cursor: 'pointer' }} />
                </div>
                <div>.</div>
            </div>
            <div className='prompt-container'>
                <p className='settitle'>MODEL</p>
                <select id="dropdown" className="search modelselect">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                </select>           
            </div>
            <div className='prompt-container'>
                <p className='settitle'>TEMPERATURE</p>
                <input className='search range' type='range' min="1" max="20" />
            </div>
            <div className='prompt-container'>
                <p className='settitle'>P VALUE</p>
                <input className='search range' type='range' min="1" max="10" />
            </div>
            <div className='prompt-container'>
                <div className='search fileupload' type='text' >
                    <Upload className='uploadicon'/>
                    <input className='file' type="file" name='file' />
                    <button className='upload'>UPLOAD</button>
                </div>
            </div>
        </div>

    )
}

export default Adminsettings
