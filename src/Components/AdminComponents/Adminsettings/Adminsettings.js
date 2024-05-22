import React, { useState, useEffect } from 'react';
import './Adminsettings.css'
import { Upload } from 'lucide-react';


function Adminsettings() {
    const [botName, setBotName] = useState('');
    const [instructions, setInstructions] = useState('');
    const [temperature, setTemperature] = useState('');
    const [top_p, setTop_p] = useState('');
    const [model, setModel] = useState('gpt-3.5-turbo-0125');
    const [file, setFile] = useState(null); 


    useEffect(() => {
        const fetchAssistantDetails = async () => {
            try {
                const response = await fetch('http://192.168.18.14:3003/api/assistant');
                const data = await response.json();
                setBotName(data.name);
                setInstructions(data.instructions);
                setTemperature(data.temperature);
                setTop_p(data.top_p);
                setModel(data.model)

            } catch (error) {

                console.error('Error fetching assistant details:', error);
            }
        };

        fetchAssistantDetails();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData2 = new FormData();
        formData2.append('file', file);
        try {
            const response = await fetch('http://192.168.18.14:3003/api/settings', {
                method: 'POST',
                body: formData2 
            });
            if (response.ok) {
                console.log('Upload saved successfully');
            } else {
                console.error('Error Uploading');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('botName', botName);
        formData.append('instructions', instructions);
        formData.append('temperature', parseFloat(temperature));
        formData.append('top_p', parseFloat(top_p));
        formData.append('model', model);
        // formData.append('file', file);

        try {
            const response = await fetch('http://192.168.18.14:3003/api/settings', {
                method: 'POST',
                body: formData 
            });
            if (response.ok) {
                console.log('Settings saved successfully');
            } else {
                console.error('Error saving settings');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className='chat'>
            <form onSubmit={handleSubmit}>
                <div className='prompt-container'>
                    <h5 className='settitle'>BOT NAME</h5>
                    <input className='search z1 ' type='text' value={botName} onChange={(e) => setBotName(e.target.value)} />
                </div>
                <div className='prompt-container'>
                    <h5 className='settitle'>INSTRUCTIONS</h5>
                    <textarea className='search z1 instructions' value={instructions}
                        onChange={(e) => setInstructions(e.target.value)} />
                </div>
                <div className='prompt-container'>
                    <h5 className='settitle'>MODEL</h5>
                    <select id="dropdown" className="search z1 modelselect" value={model}
                        onChange={(e) => setModel(e.target.value)}>
                        <option value="gpt-3.5-turbo-0125">gpt-3.5-turbo-0125</option>
                        <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                        <option value="gpt-4">gpt-4</option>
                        <option value="gpt-4o">gpt-4o</option>
                    </select>
                </div>
                <div className='prompt-container'>
                    <h5 className='settitle '>TEMPERATURE</h5>
                    <input className='search z1 range' type='range' min="0.1" max="2" step="0.1"  value={temperature} onChange={(e) => setTemperature(e.target.value)}
                    />
                </div>
                <div className='prompt-container'>
                    <h5 className='settitle'>TOP P</h5>
                    <input className='search z1 range' type='range' min="0.01" max="1" step="0.01" value={top_p} onChange={(e) => setTop_p(e.target.value)} />
                </div>
                <div className='prompt-container'>
                    <div className='search z1 fileupload' type='text' >
                        <Upload className='uploadicon' />
                        <input className='file' type="file" name='file' onChange={(e) => setFile(e.target.files[0])} />
                        <button className='upload' onClick={handleUpload}>Upload</button>
                    </div>
                </div>
                <button className='upload save' style={{ color: 'white' }} type="submit">SAVE</button>
            </form>

        </div>

    )
}

export default Adminsettings