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

// Retry helper with attempt callback
const retryAsync = async (fn, maxAttempts = 3, delay = 500, onRetry) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await fn();
      if (result) return { success: true, attempt };
    } catch {}
    if (attempt < maxAttempts) {
      onRetry?.(attempt);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  return { success: false };
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
  const [retryAttempt, setRetryAttempt] = useState(0);

  useEffect(() => {
    setMediaUrl(null);
    setMediaLoaded(false);
    setRetryAttempt(0);

    const validate = async () => {
      let validUrl = null;
      const onRetry = (attempt) => setRetryAttempt(attempt);

      if (mediaType === "image") {
        if ((await retryAsync(() => validateImage(hdurl), retryCount, retryDelay, onRetry)).success)
          validUrl = hdurl;
        else if ((await retryAsync(() => validateImage(url), retryCount, retryDelay, onRetry)).success)
          validUrl = url;
      } else if (mediaType === "video") {
        if ((await retryAsync(() => validateVideo(url), retryCount, retryDelay, onRetry)).success)
          validUrl = url;
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
        <div className={`alien-skeleton ${mediaType === "video" ? "video-skeleton" : ""}`}>
          {getAlienText(40)}
          {retryAttempt > 0 && (
            <div className="retry-counter">
              Retrying... attempt {retryAttempt} / {retryCount}
            </div>
          )}
        </div>
      )}

      {mediaType === "video" && mediaUrl && (
        <iframe
          src={mediaUrl}
          title={title}
          frameBorder="0"
          allowFullScreen
          className={infoOpen ? "obscured" : ""}
          onLoad={() => setMediaLoaded(true)}
        />
      )}

      {mediaType === "image" && mediaUrl && (
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
