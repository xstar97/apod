import React, { useState, useEffect } from "react";
import InfoPanel from "./components/InfoPanel";
import NavigationBar from "./components/NavigationBar";
import { API_ROUTE, getCurrentDate, updateUrlQueryParam, isValidDate } from "./Utils";
import "./App.css";
import "./LoadingSkeleton.css";

function App() {
  const [date, setDate] = useState(getCurrentDate());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  // Initialize date from URL query
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryDate = params.get("date");
    if (queryDate && isValidDate(queryDate)) setDate(queryDate);
  }, []);

  // Helper to dynamically set favicon
  const updateFavicon = (url) => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = url;
  };

  // Fetch APOD data
  useEffect(() => {
    if (!date) return;
    setLoading(true);
    setMediaLoaded(false);

    fetch(`${API_ROUTE}?date=${date}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);

        // Dynamic page title
        document.title = d.title ? `${d.title} - APOD` : "Astronomy Picture of the Day";

        // Dynamic favicon
        if (d.media_type === "image") {
          updateFavicon(d.url); // Use APOD image as favicon
        } else {
          updateFavicon("/favicon-video.png"); // default icon for videos
        }
      })
      .finally(() => setLoading(false));
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
      <div className="media-container">
        {!mediaLoaded && <div className="alien-skeleton">⧖⚲ ⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪</div>}

        {data.media_type === "video" ? (
          <iframe
            src={data.url}
            title={data.title}
            frameBorder="0"
            allowFullScreen
            className={infoOpen ? "obscured" : ""}
            onLoad={() => setMediaLoaded(true)}
          />
        ) : (
          <img
            src={data.hdurl}
            alt={data.title}
            className={infoOpen ? "obscured" : ""}
            onLoad={() => setMediaLoaded(true)}
          />
        )}

        {infoOpen && <div className="media-overlay"></div>}
      </div>

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
