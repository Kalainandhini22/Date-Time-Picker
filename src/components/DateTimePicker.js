import React, { useState } from 'react';
import CalendarDialog from './CalendarDialog';
import TimeDialog from './TimeDialog'; 

const DateTimePicker = ({ type, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);

  const updateValue = (e) => {
    onChange(e.target.value);
  };

  const openPicker = () => {
    setOpen(true);
  };

  const closePicker = () => {
    setOpen(false);
  };

  let pickerElement = null;
  if (open === true) {
    if (type === "date") {
      pickerElement = (
        <CalendarDialog 
          onSelect={onChange} 
          onClose={closePicker} 
        />
      );
    } else {
      pickerElement = (
        <TimeDialog 
          onSelect={onChange} 
          onClose={closePicker} 
        />
      );
    }
  }

  let icon = "";
  if (type === "date") {
    icon = "📅";
  } else {
    icon = "🕒";
  }

  let defaultHint = "";
  if (type === "date") {
    defaultHint = "MM/dd/yyyy";
  } else {
    defaultHint = "hh:mm AM/PM";
  }

  return (
    <div style={boxStyle}>
      <input 
        type="text" 
        placeholder={placeholder || defaultHint} 
        value={value} 
        onChange={updateValue} 
        style={fieldStyle}
      />
      
      <span style={btnStyle} onClick={openPicker}>
        {icon}
      </span>
      
      {pickerElement}
    </div>
  );
};

const boxStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  background: '#1a1d23', 
  border: '1px solid #333',
  borderRadius: '8px',
  padding: '5px 12px',
  margin: '10px'
};

const fieldStyle = {
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: '#fff', 
  fontSize: '14px',
  width: '120px'
};

const btnStyle = {
  cursor: 'pointer',
  marginLeft: '8px',
  fontSize: '16px',
  opacity: 0.7
};

export default DateTimePicker;
