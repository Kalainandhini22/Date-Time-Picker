import { useState } from 'react';

export const useCalendar = () => {
  const [viewDate, setViewDate] = useState(new Date());
  
  const [hours, setHours] = useState("12");
  const [minutes, setMinutes] = useState("00");
  const [ampm, setAmpm] = useState("AM");

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (y, m) => new Date(y, m, 1).getDay();

  const changeMonth = (offset) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const changeYear = (year) => {
    setViewDate(new Date(year, viewDate.getMonth(), 1));
  };

  const jumpTo = (y, m) => {
    setViewDate(new Date(y, m, 1));
  };

  return { 
    viewDate, 
    hours, 
    setHours, 
    minutes, 
    setMinutes, 
    ampm, 
    setAmpm,
    getDaysInMonth, 
    getFirstDay, 
    changeMonth, 
    changeYear,
    jumpTo 
  };
};
