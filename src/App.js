import React, { useState, useEffect } from "react";
import InfoPanel from "./components/InfoPanel";
import NavigationBar from "./components/NavigationBar";
import { API_ROUTE, getCurrentDate, updateUrlQueryParam, isValidDate } from "./Utils";
import "./App.css";
import "./LoadingSkeleton.css"; // New CSS for alien skeleton

function App() {
  const [date, setDate] = useState(getCurrentDate());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mediaLoaded, setMediaLoaded] = useState(false); // track if media has finished loading
  const [infoOpen, setInfoOpen] = useState(false);

  // Helper functions for media type detection
  const isImage = (media) => media?.media_type === "image";
  const isVideo = (media) => media?.media_type === "video";

  // Initialize date from URL query
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryDate = params.get("date");
    if (queryDate && isValidDate(queryDate)) setDate(queryDate);
  }, []);

  // Fetch APOD data
  useEffect(() => {
    if (!date) return;
    setLoading(true);
    setMediaLoaded(false);
    fetch(`${API_ROUTE}?date=${date}`)
      .then((res) => res.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, [date]);

  // Date navigation handlers
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

  // Show nothing if loading or no data yet
  if (loading || !data) return null;

  return (
    <>
      {/* Fullscreen media */}
      <div className="media-container">
        {!mediaLoaded && (
          <div className="alien-skeleton">
            ⧖⚲ ⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪
          </div>
        )}

        {isVideo(data) && (
          <iframe
            src={data.url}
            title={data.title}
            frameBorder="0"
            allowFullScreen
            className={infoOpen ? "obscured" : ""}
            onLoad={() => setMediaLoaded(true)}
          ></iframe>
        )}

        {isImage(data) && (
          <img
            src={data.hdurl}
            alt={data.title}
            className={infoOpen ? "obscured" : ""}
            onLoad={() => setMediaLoaded(true)}
          />
        )}

        {/* Overlay when info panel is open */}
        {infoOpen && <div className="media-overlay"></div>}
      </div>

      {/* Info FAB button */}
      <button className="fab-info" onClick={() => setInfoOpen(!infoOpen)}>
        {infoOpen ? "×" : "i"}
      </button>

      {/* Slide-out info panel */}
      <InfoPanel data={data} open={infoOpen} onClose={() => setInfoOpen(false)} />

      {/* Bottom navigation bar */}
      <NavigationBar
        currentDate={date}
        onDateChange={handleDateChange}
        onCalendarChange={handleCalendarChange}
      />
    </>
  );
}

export default App;
