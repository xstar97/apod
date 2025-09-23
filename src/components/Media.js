import React, { useState, useEffect } from "react";

// Validate image URL
const validateImage = (url) =>
  new Promise((resolve) => {
    if (!url) return resolve(false);
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });

// Validate video URL via HEAD request
const validateVideo = async (url) => {
  if (!url) return false;
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
};

// Retry helper: configurable attempts and delay
const retryAsync = async (fn, maxAttempts = 3, delay = 500) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await fn();
      if (result) return result;
    } catch {}
    if (attempt < maxAttempts) await new Promise((res) => setTimeout(res, delay));
  }
  return false;
};

export default function Media({
  mediaType,
  hdurl,
  url,
  title,
  infoOpen,
  retryCount = 3,
  retryDelay = 500
}) {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  const isImage = mediaType === "image";
  const isVideo = mediaType === "video";

  useEffect(() => {
    setMediaUrl(null);
    setMediaLoaded(false);

    const validate = async () => {
      let validUrl = null;

      if (isImage) {
        if (await retryAsync(() => validateImage(hdurl), retryCount, retryDelay)) validUrl = hdurl;
        else if (await retryAsync(() => validateImage(url), retryCount, retryDelay)) validUrl = url;
      } else if (isVideo) {
        if (await retryAsync(() => validateVideo(url), retryCount, retryDelay)) validUrl = url;
      }

      setMediaUrl(validUrl);
    };

    validate();
  }, [hdurl, url, mediaType, retryCount, retryDelay]);

  // Skeleton generator
  const getAlienText = (length = 20) => {
    const chars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  return (
    <div className="media-container">
      {!mediaLoaded && (
        <div className={`alien-skeleton ${isVideo ? "video-skeleton" : ""}`}>
          {getAlienText(40)}
        </div>
      )}

      {isVideo && mediaUrl && (
        <iframe
          src={mediaUrl}
          title={title}
          frameBorder="0"
          allowFullScreen
          className={infoOpen ? "obscured" : ""}
          onLoad={() => setMediaLoaded(true)}
        />
      )}

      {isImage && mediaUrl && (
        <img
          src={mediaUrl}
          alt={title}
          className={infoOpen ? "obscured" : ""}
          onLoad={() => setMediaLoaded(true)}
        />
      )}

      {infoOpen && <div className="media-overlay"></div>}
    </div>
  );
}
