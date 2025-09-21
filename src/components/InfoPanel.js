import React, { useEffect, useState } from "react";
import "./InfoPanel.css";

const InfoPanel = ({ data, open }) => {
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayDate, setDisplayDate] = useState("");
  const [displayDesc, setDisplayDesc] = useState("");
  const [decoding, setDecoding] = useState(false);

  useEffect(() => {
    if (!open) return;

    const alienChars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";
    const getRandomChar = (len) =>
      Array.from({ length: len }, () => alienChars[Math.floor(Math.random() * alienChars.length)]).join("");

    // Show alien text first
    setDisplayTitle(getRandomChar(data.title.length));
    setDisplayDate(getRandomChar(data.date.length));
    setDisplayDesc(getRandomChar(data.explanation.length));
    setDecoding(true);

    // After 2 seconds, show real text
    const timeout = setTimeout(() => {
      setDisplayTitle(data.title);
      setDisplayDate(data.date);
      setDisplayDesc(data.explanation);
      setDecoding(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [open, data]);

  return (
    <div className={`info-panel ${open ? "open" : ""}`}>
      <h1 className={`alien-glitch ${decoding ? "active" : ""}`}>{displayTitle}</h1>
      <p className={`alien-glitch ${decoding ? "active" : ""}`}>{displayDate}</p>
      {data.copyright && (
        <p className={`alien-glitch ${decoding ? "active" : ""}`}>
          Copyright: {data.copyright}
        </p>
      )}
      <div className="description-container">
        <p className={`alien-glitch ${decoding ? "active" : ""}`}>{displayDesc}</p>
      </div>
    </div>
  );
};

export default InfoPanel;
