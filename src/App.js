import React, { useState, useEffect } from "react";
import InfoPanel from "./components/InfoPanel";
import NavigationBar from "./components/NavigationBar";
import Media from "./components/Media";
import { isValidDate, getCurrentDate, updateUrlQueryParam, setFavicon, setMetaTags, TITLE, API_ROUTE } from './Utils.js';
import "./App.css";
import "./LoadingSkeleton.css";

function App() {
  const [date, setDate] = useState(getCurrentDate());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryDate = params.get("date");
    if (queryDate && isValidDate(queryDate)) setDate(queryDate);
  }, []);

  useEffect(() => {
    if (!date) return;

    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_ROUTE}?date=${date}`);
        const d = await res.json();
        setData(d);

        document.title = d.title || TITLE;
        document.description = d.description || "";
        const faviconUrl = d.hdurl || d.url;
        if (faviconUrl) setFavicon(faviconUrl);
        setMetaTags(d);
      } catch (err) {
        console.error("Failed to fetch APOD data:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);
  
  // Close InfoPanel whenever the date changes
  useEffect(() => {
    setInfoOpen(false);
  }, [date]);

  const handleDateChange = (inc) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + inc);
    const formatted = newDate.toISOString().split("T")[0];
    updateUrlQueryParam("date", formatted);
    setDate(formatted);
  };

  const handleCalendarChange = (newDate) => {
    const formatted = new Date(newDate).toISOString().split("T")[0];
    updateUrlQueryParam("date", formatted);
    setDate(formatted);
  };

  if (loading || !data) return null;

  return (
    <>
      {/* Media Section */}
      <Media
        mediaType={data.media_type}
        hdurl={data.hdurl}
        url={data.url}
        title={data.title}
        infoOpen={infoOpen}
        retryCount={3}      // number of retry attempts
        retryDelay={500}    // delay between retries in ms
      />
      {/* Info FAB */}
      <button className="fab-info" onClick={() => setInfoOpen(!infoOpen)}>
        {infoOpen ? "×" : "i"}
      </button>

      {/* Info Panel */}
      <InfoPanel data={data} open={infoOpen} onClose={() => setInfoOpen(false)} />

      {/* Bottom Navigation */}
      <NavigationBar
        currentDate={date}
        onDateChange={handleDateChange}
        onCalendarChange={handleCalendarChange}
      />
    </>
  );
}

export default App;
