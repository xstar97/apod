import React, { useEffect, useState } from 'react';
import './App.css';
import { isValidDate, getCurrentDate, updateUrlQueryParam, setFavicon, setMetaTags, TITLE, API_ROUTE } from './Utils.js';
import ApodComponent from './components/ApodComponent.js';
import LoadingComponent from './components/LoadingComponent.js';
import NavigationButtons from './components/NavigationButtons.js';

function App() {
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get date from query parameter or use today's date
    const urlParams = new URLSearchParams(window.location.search);
    const queryDate = urlParams.get('date');

    if (queryDate && isValidDate(queryDate)) {
      // If a valid date is provided in the query, use it
      setDate(queryDate);
    } else {
      // Otherwise, use the current date
      const currentDate = getCurrentDate();
      setDate(currentDate);
      updateUrlQueryParam('date', currentDate);
    }
  }, []);

  useEffect(() => {
    // Fetch data only if the date is set
    if (date) {
      setLoading(true);

      fetch(`${API_ROUTE}?date=${date}`)
        .then(response => response.json())
        .then(data => {
          setData(data);

          // Set the page title using data.title
          document.title = data.title || TITLE;
          document.description = data.description || "";
          // Set the favicon using data.hdurl or data.url
          const faviconUrl = data.hdurl || data.url;
          if (faviconUrl) {
            setFavicon(faviconUrl);
          }
          setMetaTags(data);
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => setLoading(false));
    }
  }, [date]);

  const handleDateChange = (increment) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + increment);
    const formattedDate = newDate.toISOString().split('T')[0];

    updateUrlQueryParam('date', formattedDate);
    setDate(formattedDate);
  };

  const handleCalendarChange = (date) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toISOString().split('T')[0];

    updateUrlQueryParam('date', formattedDate);
    setDate(formattedDate);
  };

  return (
    <div className="App" style={{ padding: '10px', margin: '10px' }}>
      <NavigationButtons onDateChange={handleDateChange} onCalenderChange={handleCalendarChange} currentDate={date} />
      {loading ? (
        <LoadingComponent />
      ) : (
        data ? (
          <ApodComponent data={data} />
        ) : (
          <LoadingComponent />
        )
      )}
    </div>
  );
}

export default App;
