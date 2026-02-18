import React, { useState } from 'react';
import DateTimePicker from './components/DateTimePicker';
import './App.css';

function App() {
  // 1. States for storing the choices
  const [date, setDate] = useState(''); // Stores the date string
  const [time, setTime] = useState(''); // Stores the time string
  const [submittedValue, setSubmittedValue] = useState(''); // Stores result for the green text

  // 2. Logic to show the result when Submit is clicked
  const handleSubmit = () => {
    if (!date || !time) {
      alert("Please select both Date and Time!");
      return;
    }
    setSubmittedValue(`${date} & ${time}`);
  };

  // 3. Logic to clear everything (The Reset Button)
  const handleReset = () => {
    setDate('');
    setTime('');
    setSubmittedValue('');
  };

  return (
    <div className="App">
      <h1>Custom Date Time Picker</h1>
      
      {/* 4. The container that keeps the two boxes side-by-side */}
      <div className="picker-container">
        <DateTimePicker 
          type="date" 
          value={date} 
          onChange={setDate} 
          placeholder="Select Date" 
        />

        <DateTimePicker 
          type="time" 
          value={time} 
          onChange={setTime} 
          placeholder="Select Time" 
        />
      </div>
      
      {/* 5. Group for Submit and Reset buttons */}
      <div className="button-group">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* 6. Displaying the final result in Green */}
      {submittedValue && (
        <div className="result-display">
          <span>Selected Date & Time: </span>
          <span className="green-text">{submittedValue}</span>
        </div>
      )}
    </div>
  );
}

export default App;