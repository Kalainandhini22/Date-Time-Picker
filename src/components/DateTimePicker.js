import React, { useState } from 'react';
import CalendarDialog from './CalendarDialog';
import TimeDialog from './TimeDialog'; 

const DateTimePicker = ({ type, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'inline-block', margin: '10px' }}>
      <input 
        type="text" 
        readOnly 
        placeholder={placeholder} 
        value={value} 
        onClick={() => setIsOpen(true)}
      />
      
      {isOpen && type === 'date' && (
        <CalendarDialog 
          onSelect={onChange} 
          onClose={() => setIsOpen(false)} 
        />
      )}

      {isOpen && type === 'time' && (
        <TimeDialog 
          onSelect={onChange} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </div>
  );
};

export default DateTimePicker;