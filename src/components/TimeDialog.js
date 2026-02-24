import React, { useState } from 'react';

const TimeDialog = ({ onSelect, onClose }) => {
  const [hour, setHour] = useState("12");
  const [min, setMin] = useState("00");
  const [period, setPeriod] = useState("AM");

  const saveTime = () => {
    onSelect(hour + ":" + min + " " + period);
    onClose();
  };

  const getHourOptions = () => {
    let hours = [];
    for (let i = 1; i <= 12; i++) {
      let val = "";
      if (i < 10) {
        val = "0" + i;
      } else {
        val = "" + i;
      }
      hours.push(<option key={val} value={val}>{val}</option>);
    }
    return hours;
  };

  const getMinOptions = () => {
    let mins = [];
    for (let i = 0; i < 60; i++) {
      let val = "";
      if (i < 10) {
        val = "0" + i;
      } else {
        val = "" + i;
      }
      mins.push(<option key={val} value={val}>{val}</option>);
    }
    return mins;
  };

  return (
    <div style={bgOverlay} onClick={onClose}>
      <div style={mainBox} onClick={e => e.stopPropagation()}>
        <h3 style={{ color: '#00a3e0', marginBottom: '15px' }}>Select Time</h3>
        
        <div style={inputArea}>
          <select value={hour} onChange={e => setHour(e.target.value)} style={dropdownStyle}>
            {getHourOptions()}
          </select>

          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>:</span>

          <select value={min} onChange={e => setMin(e.target.value)} style={dropdownStyle}>
            {getMinOptions()}
          </select>

          <select value={period} onChange={e => setPeriod(e.target.value)} style={dropdownStyle}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <div style={bottomArea}>
          <button onClick={onClose} style={cancelBtn}>
            Cancel
          </button>
          <button onClick={saveTime} style={setBtn}>
            Set Time
          </button>
        </div>
      </div>
    </div>
  );
};

const bgOverlay = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const mainBox = { background: '#fff', padding: '25px', borderRadius: '12px', width: '260px', textAlign: 'center' };
const inputArea = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' };
const dropdownStyle = { padding: '8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '16px', outline: 'none' };
const bottomArea = { display: 'flex', justifyContent: 'flex-end', marginTop: '20px' };
const cancelBtn = { background: 'none', border: 'none', color: '#666', marginRight: '15px', cursor: 'pointer' };
const setBtn = { backgroundColor: '#00a3e0', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };

export default TimeDialog;
