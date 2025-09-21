import React, { useEffect, useState } from "react";
import "./InfoPanel.css";

const InfoPanel = ({ data, open, onClose }) => {
  const alienChars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";
  const getRandomChar = () => alienChars[Math.floor(Math.random() * alienChars.length)];
  const initAlienText = (text) => text.split("").map(() => getRandomChar()).join("");

  const [displayTitle, setDisplayTitle] = useState(initAlienText(data.title));
  const [displayDate, setDisplayDate] = useState(initAlienText(data.date));
  const [displayDesc, setDisplayDesc] = useState(initAlienText(data.explanation));
  const [displayCopyRight, setDisplayCopyRight] = useState(
    data.copyright ? initAlienText(data.copyright) : ""
  );
  const [decoding, setDecoding] = useState(false);

  useEffect(() => {
    if (!open) return;

    setDecoding(true);

    // Local arrays to hold current alien text
    const titleArray = data.title.split("").map(() => getRandomChar());
    const dateArray = data.date.split("").map(() => getRandomChar());
    const descArray = data.explanation.split("").map(() => getRandomChar());
    const copyRightArray = data.copyright
      ? data.copyright.split("").map(() => getRandomChar())
      : [];

    // Generic decode function
    const decodeText = (arr, text, setFn, steps) => {
      let index = 0;
      const interval = setInterval(() => {
        const step = Math.max(1, Math.floor(text.length / steps));
        let done = true;
        for (let i = 0; i < step && index < text.length; i++, index++) {
          arr[index] = text[index];
        }
        setFn([...arr].join(""));
        if (index < text.length) done = false;
        if (done) clearInterval(interval);
      }, 30);
    };

    decodeText(titleArray, data.title, setDisplayTitle, 8);
    decodeText(dateArray, data.date, setDisplayDate, 8);
    decodeText(descArray, data.explanation, setDisplayDesc, 12);
    if (copyRightArray.length) decodeText(copyRightArray, data.copyright, setDisplayCopyRight, 8);

    setDecoding(false);
  }, [open, data]); // ✅ Only depend on `open` and `data`

  return (
    <div className={`info-panel ${open ? "open" : "hidden"}`}>
      <button className="close-panel" onClick={onClose}>
        ×
      </button>
      <h1 className={`alien-glitch ${decoding ? "active" : ""}`}>{displayTitle}</h1>
      <p className={`alien-glitch ${decoding ? "active" : ""}`}>{displayDate}</p>
      {displayCopyRight && (
        <p className={`alien-glitch ${decoding ? "active" : ""}`}>{displayCopyRight}</p>
      )}
      <div className="description-container">
        <p className={`alien-glitch ${decoding ? "active" : ""}`}>{displayDesc}</p>
      </div>
    </div>
  );
};

export default InfoPanel;
