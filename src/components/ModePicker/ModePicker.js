import React, { useState } from 'react';
import './ModePicker.css';

const ModePicker = ({ handleFormSubmit }) => {

  const [mode, setMode] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setMode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mode) return;
    handleFormSubmit(mode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='selectWrapper'>
      <select className='modePicker' onChange={handleChange} id="mode" name="mode">
        <option value="" disabled selected>Pick mode</option>
        <option value="easyMode">Easy</option>
        <option value="normalMode">Normal</option>
        <option value="hardMode">Hard</option>
      </select>
      </div>
      <button type="submit" className="btn-submit">START</button>
    </form>
  );
};

export default ModePicker;