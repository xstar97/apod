import React from "react";

const NavigationBar = ({ currentDate, onDateChange, onCalendarChange }) => {
  return (
    <div className="navigation-bar">
      <button onClick={() => onDateChange(-1)}>PREV</button>
      <input type="date" value={currentDate} onChange={e => onCalendarChange(e.target.value)} />
      <button onClick={() => onDateChange(1)}>NEXT</button>
    </div>
  );
};

export default NavigationBar;
