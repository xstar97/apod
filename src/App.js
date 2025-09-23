import React, { useState, useEffect } from "react";
import InfoPanel from "./components/InfoPanel";
import NavigationBar from "./components/NavigationBar";
import Media from "./components/Media";
import { isValidDate, getCurrentDate, updateUrlQueryParam, setFavicon, setMetaTags, TITLE, API_ROUTE } from './Utils.js';
import { fetchAPODData, updateDocumentMeta, getInitialDateFromUrl, changeDate, formatCalendarDate } from './appUtils.js';
import "./css/App.css";
import "./css/LoadingSkeleton.css";

function App() {
  const [date, setDate] = useState(getInitialDateFromUrl(isValidDate, getCurrentDate));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);

  // Fetch APOD data
  useEffect(() => {
    if (!date) return;
    setLoading(true);

    const fetchData = async () => {
      const d = await fetchAPODData(date);
      if (d) {
        setData(d);
        updateDocumentMeta(d, setFavicon, setMetaTags);
      } else {
        setData(null);
      }
      setLoading(false);
    };

    fetchData();
  }, [date]);

  // Close InfoPanel whenever the date changes
  useEffect(() => {
    setInfoOpen(false);
  }, [date]);

  const handleDateChange = (inc) => {
    const formatted = changeDate(date, inc, updateUrlQueryParam);
    setDate(formatted);
  };

  const handleCalendarChange = (newDate) => {
    const formatted = formatCalendarDate(newDate, updateUrlQueryParam);
    setDate(formatted);
  };

  if (loading || !data) return null;

  return (
    <>
      <Media
        mediaType={data.media_type}
        hdurl={data.hdurl}
        url={data.url}
        title={data.title}
        infoOpen={infoOpen}
        retryCount={3}
        retryDelay={500}
      />

      <button className="fab-info" onClick={() => setInfoOpen(!infoOpen)}>
        {infoOpen ? "×" : "i"}
      </button>

      <InfoPanel data={data} open={infoOpen} onClose={() => setInfoOpen(false)} />

      <NavigationBar
        currentDate={date}
        onDateChange={handleDateChange}
        onCalendarChange={handleCalendarChange}
      />
    </>
  );
}

export default App;
