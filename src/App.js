import React, { useState, useEffect } from "react";
import ApodComponent from "./components/ApodComponent";
import LoadingComponent from "./components/LoadingComponent";
import "./App.css";
import { isValidDate, getCurrentDate, updateUrlQueryParam, setFavicon, setMetaTags, TITLE, API_ROUTE } from "./Utils";

function App() {
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryDate = params.get("date");

    if (queryDate && isValidDate(queryDate)) setDate(queryDate);
    else {
      const today = getCurrentDate();
      setDate(today);
      updateUrlQueryParam("date", today);
    }
  }, []);

  useEffect(() => {
    if (!date) return;

    setLoading(true);
    fetch(`${API_ROUTE}?date=${date}`)
      .then(res => res.json())
      .then(d => {
        setData(d);
        document.title = d.title || TITLE;
        const faviconUrl = d.hdurl || d.url;
        if (faviconUrl) setFavicon(faviconUrl);
        setMetaTags(d);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [date]);

  const handleDateChange = (increment) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + increment);
    const formatted = newDate.toISOString().split("T")[0];
    updateUrlQueryParam("date", formatted);
    setDate(formatted);
  };

  const handleCalendarChange = (newDate) => {
    const formatted = new Date(newDate).toISOString().split("T")[0];
    updateUrlQueryParam("date", formatted);
    setDate(formatted);
  };

  return (
    <div className="apod-main">
      {loading ? (
        <LoadingComponent realData={data || { title: "Loading...", date: getCurrentDate(), explanation: "Fetching data..." }} />
      ) : (
        <ApodComponent
          data={data}
          date={date}
          onDateChange={handleDateChange}
          onCalendarChange={handleCalendarChange}
        />
      )}
    </div>
  );
}

export default App;
