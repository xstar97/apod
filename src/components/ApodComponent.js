import React, { useState } from "react";
import NavigationButtons from "./NavigationButtons";

const ApodComponent = ({ data, date, onDateChange, onCalendarChange }) => {
  const [mediaLoaded, setMediaLoaded] = useState(false);

  return (
    <>
      <div className="media-container">
        {!mediaLoaded && <div className="media-skeleton glitch-shimmer"></div>}
        {data.media_type === "video" ? (
          <iframe
            src={data.url}
            title={data.title}
            width="512"
            height="512"
            allowFullScreen
            className={mediaLoaded ? "media-visible" : "media-hidden"}
            onLoad={() => setMediaLoaded(true)}
          />
        ) : (
          <img
            src={data.hdurl}
            alt={data.title}
            width="512"
            height="512"
            className={mediaLoaded ? "media-visible" : "media-hidden"}
            onLoad={() => setMediaLoaded(true)}
          />
        )}
      </div>

      <div className="info-container">
        <h1>{data.title}</h1>
        <p>{data.date}</p>
        {data.copyright && <p>Copyright: {data.copyright}</p>}
        <div className="description-container">
          <p>{data.explanation}</p>
        </div>

        <NavigationButtons
          currentDate={date}
          onDateChange={onDateChange}
          onCalendarChange={onCalendarChange}
        />
      </div>
    </>
  );
};

export default ApodComponent;
