import React, { useState } from 'react';

const TimeDialog = ({ onSelect, onClose }) => {
  
  const [h, setH] = useState("12");
  const [m, setM] = useState("00");
  const [p, setP] = useState("AM");

  const handleDone = () => {
    
    onSelect(`${h}:${m} ${p}`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="time-only-box" onClick={e => e.stopPropagation()}>
        <h3>Select Time</h3>
        
        <div className="time-inputs">
          
          <select value={h} onChange={e => setH(e.target.value)}>
            {Array.from({length: 12}, (_, i) => String(i + 1).padStart(2, '0')).map(v => <option key={v}>{v}</option>)}
          </select>

          <span>:</span>

          
          <select value={m} onChange={e => setM(e.target.value)}>
            {Array.from({length: 60}, (_, i) => String(i).padStart(2, '0')).map(v => <option key={v}>{v}</option>)}
          </select>

          
          <select value={p} onChange={e => setP(e.target.value)}>
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>

        <button className="done-btn" onClick={handleDone}>Set Time</button>
      </div>
    </div>
  );
};

export default TimeDialog;