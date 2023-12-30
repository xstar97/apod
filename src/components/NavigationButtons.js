import React from 'react';
import { getCurrentDate } from '../Utils.js';

const NavigationButtons = ({ onDateChange, onCalenderChange, currentDate }) => {
  const handleDateChange = (increment) => {
    onDateChange(increment);
  };

  const handleCalendarChange = (date) => {
    onCalenderChange(date)
  };

  return (
    <div className="navigation-buttons">
      <button
        className="nav-button"
        onClick={() => handleDateChange(-1)}
      >
        Previous {currentDate && `(${getFormattedDate(currentDate, -1)})`}
      </button>
      <input
        type="date"
        value={currentDate}
        onChange={(e) => handleCalendarChange(e.target.value)}
      />
      <button
        className="nav-button"
        onClick={() => handleDateChange(1)}
        style={{ display: currentDate === getCurrentDate() ? 'none' : 'block' }}
      >
        Next {currentDate && `(${getFormattedDate(currentDate, 1)})`}
      </button>
    </div>
  );
};

const getFormattedDate = (currentDate, increment) => {
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + increment);
  return newDate.toISOString().split('T')[0];
};

export default NavigationButtons;
