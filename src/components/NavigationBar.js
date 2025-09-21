import React from "react";
import "./NavigationBar.css";

const NavigationBar = ({ currentDate, onDateChange, onCalendarChange }) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="navigation-bar">
      <button className="nav-button" onClick={() => onDateChange(-1)}>Prev</button>
      <input
        type="date"
        value={currentDate}
        onChange={(e) => onCalendarChange(e.target.value)}
        className="date-selector"
      />
      {currentDate !== today && (
        <button className="nav-button" onClick={() => onDateChange(1)}>Next</button>
      )}
    </div>
  );
};

export default NavigationBar;
