import React, { useState, useEffect } from "react";
import {
  getValidMediaUrl,
  getAlienText
} from "../utils/mediaUtils";

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
      const validUrl = await getValidMediaUrl({
        mediaType,
        hdurl,
        url,
        retryCount,
        retryDelay,
        onRetry: (attempt) => setRetryAttempt(attempt)
      });
      setMediaUrl(validUrl);
    };

    validate();
  }, [hdurl, url, mediaType, retryCount, retryDelay]);

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
