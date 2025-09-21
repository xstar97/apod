import React from "react";
import { getCurrentDate } from "../Utils";
import "./NavigationBar.css";

const NavigationBar = ({ currentDate, onDateChange, onCalendarChange }) => {
  const today = getCurrentDate();

  return (
    <div className="navigation-bar">
      <button onClick={() => onDateChange(-1)}>PREV</button>

      <input
        type="date"
        value={currentDate}
        onChange={(e) => onCalendarChange(e.target.value)}
        max={today} // prevent selecting future dates
      />

      {currentDate !== today && (
        <button onClick={() => onDateChange(1)}>NEXT</button>
      )}
    </div>
  );
};

export default NavigationBar;
