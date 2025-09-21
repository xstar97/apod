import React, { useState, useEffect } from "react";
import "./Loading.css";

const LoadingComponent = ({ realData }) => {
  const alienChars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";
  const randomChar = () => alienChars[Math.floor(Math.random() * alienChars.length)];
  const randomString = (length) => Array.from({ length }, randomChar).join("");

  const [title, setTitle] = useState(randomString(realData.title.length));
  const [date, setDate] = useState(randomString(realData.date.length));
  const [description, setDescription] = useState(randomString(realData.explanation.length));

  useEffect(() => {
    let titleIndex = 0, dateIndex = 0, descIndex = 0;

    const interval = setInterval(() => {
      if (titleIndex < realData.title.length) {
        setTitle(prev => prev.substring(0, titleIndex) + realData.title[titleIndex] + prev.substring(titleIndex + 1));
        titleIndex++;
      }
      if (dateIndex < realData.date.length) {
        setDate(prev => prev.substring(0, dateIndex) + realData.date[dateIndex] + prev.substring(dateIndex + 1));
        dateIndex++;
      }
      if (descIndex < realData.explanation.length) {
        setDescription(prev => prev.substring(0, descIndex) + realData.explanation[descIndex] + prev.substring(descIndex + 1));
        descIndex++;
      }
    }, 150);

    return () => clearInterval(interval);
  }, [realData]);

  return (
    <div className="loading-fullscreen">
      <div className="media-skeleton glitch-shimmer"></div>
      <div className="info-alien" style={{ display: 'none' }}>
        <h1>{title}</h1>
        <p>{date}</p>
        <div className="description-skeleton">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
