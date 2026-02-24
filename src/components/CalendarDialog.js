import React, { useState } from 'react';
import { useCalendar } from '../hooks/useCalendar';

const CalendarDialog = ({ onSelect, onClose, initialDate }) => {
  const { viewDate, getDaysInMonth, getFirstDay, changeMonth, changeYear } = useCalendar(initialDate);
  
  const [isMonthView, setIsMonthView] = useState(false);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const yearList = [2024, 2025, 2026, 2027]; 

  const handleDatePick = (dayNumber) => {
    let dayStr = "";
    if (dayNumber < 10) {
      dayStr = "0" + dayNumber;
    } else {
      dayStr = "" + dayNumber;
    }
    
    let monthNum = currentMonth + 1;
    let monthStr = "";
    if (monthNum < 10) {
      monthStr = "0" + monthNum;
    } else {
      monthStr = "" + monthNum;
    }
    
    let yearStr = String(currentYear).slice(-2);
    
    onSelect(dayStr + "/" + monthStr + "/" + yearStr);
    onClose();
  };

  const goToDate = (y, m) => {
    changeYear(y);
    let moveAmount = m - currentMonth;
    changeMonth(moveAmount);
    setIsMonthView(false);
  };

  const handleToday = () => {
    let d = new Date();
    let todayDate = d.getDate();
    let todayMonth = d.getMonth() + 1;
    let todayYear = String(d.getFullYear()).slice(-2);

    let finalD = "";
    if (todayDate < 10) {
        finalD = "0" + todayDate;
    } else {
        finalD = "" + todayDate;
    }

    let finalM = "";
    if (todayMonth < 10) {
        finalM = "0" + todayMonth;
    } else {
        finalM = "" + todayMonth;
    }

    onSelect(finalD + "/" + finalM + "/" + todayYear);
    onClose();
  };

  const renderDays = () => {
    let daysArray = [];
    let totalDays = getDaysInMonth(currentYear, currentMonth);
    let blanks = getFirstDay(currentYear, currentMonth);

    for (let i = 0; i < blanks; i++) {
      daysArray.push(<div key={"blank-" + i}></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      daysArray.push(
        <button key={d} onClick={() => handleDatePick(d)} style={dayButtonStyle}>
          {d}
        </button>
      );
    }
    return daysArray;
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={boxStyle} onClick={(e) => e.stopPropagation()}>
        
        <div style={headerStyle}>
          <button onClick={() => changeMonth(-1)} style={arrowBtn}>&lt;</button>
          
          <span 
            onClick={() => setIsMonthView(!isMonthView)} 
            style={{ cursor: 'pointer' }}
          >
            {monthNames[currentMonth]} {currentYear}
          </span>
          
          <button onClick={() => changeMonth(1)} style={arrowBtn}>&gt;</button>
        </div>

        {!isMonthView ? (
          <div style={gridStyle}>
            <b>Su</b><b>Mo</b><b>Tu</b><b>We</b><b>Th</b><b>Fr</b><b>Sa</b>
            {renderDays()}
          </div>
        ) : (
          <div style={scrollArea}>
            {yearList.map(y => (
              <div key={y} style={{ marginBottom: '15px' }}>
                <div 
                  style={{ fontWeight: 'bold', color: y === currentYear ? '#00a3e0' : '#333', padding: '5px' }}
                  onClick={() => changeYear(y)}
                >
                  {y}
                </div>
                
                <div style={monthGrid}>
                  {monthNames.map((m, index) => (
                    <button 
                      key={m} 
                      onClick={() => goToDate(y, index)}
                      style={{
                        background: (y === currentYear && index === currentMonth) ? '#00a3e0' : 'none',
                        color: (y === currentYear && index === currentMonth) ? '#fff' : '#333',
                        border: '1px solid #eee',
                        padding: '4px'
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={footerStyle}>
          <button onClick={handleToday} style={textBtn}>Today</button>
          <button onClick={onClose} style={textBtn}>Cancel</button>
          <button onClick={onClose} style={blueBtn}>OK</button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const boxStyle = { background: '#fff', padding: '15px', borderRadius: '10px', width: '280px' };
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' };
const scrollArea = { maxHeight: '220px', overflowY: 'auto', textAlign: 'left', padding: '5px' };
const monthGrid = { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' };
const footerStyle = { display: 'flex', justifyContent: 'space-between', marginTop: '15px' };
const arrowBtn = { background: 'none', border: 'none', fontSize: '18px', color: '#00a3e0' };
const dayButtonStyle = { background: 'none', border: 'none', padding: '8px 0', cursor: 'pointer' };
const textBtn = { background: 'none', border: 'none', color: '#00a3e0', cursor: 'pointer' };
const blueBtn = { background: '#00a3e0', color: '#fff', border: 'none', padding: '5px 15px', borderRadius: '5px' };

export default CalendarDialog;
