import React from "react";

const NavigationButtons = ({ currentDate, onDateChange, onCalendarChange }) => {
  return (
    <div className="navigation-buttons">
      <button onClick={() => onDateChange(-1)}>Previous</button>
      <input type="date" value={currentDate} onChange={(e) => onCalendarChange(e.target.value)} />
      <button onClick={() => onDateChange(1)} style={{ display: currentDate === new Date().toISOString().split("T")[0] ? "none" : "block" }}>
        Next
      </button>
    </div>
  );
};

export default NavigationButtons;
