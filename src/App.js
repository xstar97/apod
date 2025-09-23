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
  const [mediaUrl, setMediaUrl] = useState(null); // validated media URL

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

  // Validate if image URL exists
  const validateImage = (url) => {
    return new Promise((resolve) => {
      if (!url) return resolve(false);
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // Validate if video URL exists via HEAD request
  const validateVideo = async (url) => {
    if (!url) return false;
    try {
      const res = await fetch(url, { method: "HEAD" });
      return res.ok;
    } catch {
      return false;
    }
  };

  const isImage = data?.media_type === "image";
  const isVideo = data?.media_type === "video";

  // Fetch APOD data and validate media
  useEffect(() => {
    if (!date) return;

    setLoading(true);
    setMediaLoaded(false);
    setMediaUrl(null);

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_ROUTE}?date=${date}`);
        const d = await res.json();
        setData(d);

        // Dynamic set meta tags
        setMetaTags(d);

        // Dynamic favicon
        if (d.media_type === "image") {
          updateFavicon(d.url);
        } else {
          updateFavicon("/favicon-video.png");
        }

        // Validate media URL fallback
        if (d.media_type === "image") {
          if (await validateImage(d.hdurl)) setMediaUrl(d.hdurl);
          else if (await validateImage(d.url)) setMediaUrl(d.url);
        } else if (d.media_type === "video") {
          if (await validateVideo(d.url)) setMediaUrl(d.url);
        }
      } catch (err) {
        console.error("Failed to fetch APOD data:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  // Generate animated alien skeleton string
  const getAlienText = (length = 20) => {
    const chars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  return (
    <>
      <div className="media-container">
        {/* Alien skeleton overlay */}
        {!mediaLoaded && (
          <div className={`alien-skeleton ${isVideo ? "video-skeleton" : ""}`}>
            {getAlienText(40)}
          </div>
        )}

        {/* Media display */}
        {isVideo && mediaUrl && (
          <iframe
            src={mediaUrl}
            title={data.title}
            frameBorder="0"
            allowFullScreen
            className={infoOpen ? "obscured" : ""}
            onLoad={() => setMediaLoaded(true)}
          />
        )}
        {isImage && mediaUrl && (
          <img
            src={mediaUrl}
            alt={data.title}
            className={infoOpen ? "obscured" : ""}
            onLoad={() => setMediaLoaded(true)}
          />
        )}

        {/* Obscure overlay when info panel open */}
        {infoOpen && <div className="media-overlay"></div>}
      </div>

      {/* Info FAB button */}
      <button className="fab-info" onClick={() => setInfoOpen(!infoOpen)}>
        {infoOpen ? "×" : "i"}
      </button>

      {/* Slide-out info panel */}
      <InfoPanel data={data} open={infoOpen} onClose={() => setInfoOpen(false)} />

      {/* Bottom navigation */}
      <NavigationBar
        currentDate={date}
        onDateChange={handleDateChange}
        onCalendarChange={handleCalendarChange}
      />
    </>
  );
}

export default App;
