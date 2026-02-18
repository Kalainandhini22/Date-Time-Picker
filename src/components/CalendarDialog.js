import React from 'react';
import { useCalendar } from '../hooks/useCalendar';

const CalendarDialog = ({ onSelect, onClose }) => {
  const { viewDate, getDaysInMonth, getFirstDay, changeMonth, changeYear } = useCalendar();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  
  const years = [];
  for (let i = 2000; i <= 2027; i++) { years.push(i); }

  const selectDay = (day) => {
    const dd = String(day).padStart(2, '0');
    const mm = String(month + 1).padStart(2, '0');
    const yy = String(year).slice(-2);
    onSelect(`${dd}/${mm}/${yy}`); 
    onClose(); 
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="calendar-box" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <button onClick={() => changeMonth(-1)}>&lt;</button>
          <select value={year} onChange={(e) => changeYear(Number(e.target.value))}>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <span>{viewDate.toLocaleString('default', { month: 'short' })}</span>
          <button onClick={() => changeMonth(1)}>&gt;</button>
        </div>

        <div className="grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <b key={d}>{d}</b>)}
          
          {Array(getFirstDay(year, month)).fill(null).map((_, i) => <div key={i} />)}
          
          {Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1).map(day => (
            <button key={day} onClick={() => selectDay(day)}>{day}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarDialog;