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
    let titleIndex = 0;
    let dateIndex = 0;
    let descIndex = 0;

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
    }, 50);

    return () => clearInterval(interval);
  }, [realData]);

  return (
    <>
      <div className="media-skeleton glitch-shimmer"></div>
      <div className="info-skeleton">
        <h1 className="alien-glitch">{title}</h1>
        <p className="alien-glitch">{date}</p>
        <p className="alien-glitch">⧖⚲ ⟊⟒⟟⌖⋉</p>
        <div className="description-skeleton">
          <p className="alien-glitch">{description}</p>
        </div>
        <div className="nav-skeleton"></div>
      </div>
    </>
  );
};

export default LoadingComponent;
