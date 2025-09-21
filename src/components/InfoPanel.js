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

    // Helper function to decode each text
    const decodeText = (alienText, realText, setTextFn, steps) => {
      let chars = alienText.split("");
      let index = 0;

      const interval = setInterval(() => {
        let done = true;
        const step = Math.max(1, Math.floor(realText.length / steps));

        for (let i = 0; i < step && index < realText.length; i++, index++) {
          chars[index] = realText[index];
        }

        setTextFn(chars.join(""));

        if (index < realText.length) done = false;
        if (done) clearInterval(interval);
      }, 30); // Small interval for smooth transition
    };

    decodeText(displayTitle, data.title, setDisplayTitle, 8);
    decodeText(displayDate, data.date, setDisplayDate, 8);
    decodeText(displayDesc, data.explanation, setDisplayDesc, 12);
    if (displayCopyRight) decodeText(displayCopyRight, data.copyright, setDisplayCopyRight, 8);

    setDecoding(false);
  }, [open, data]);

  return (
    <div className={`info-panel ${open ? "open" : "hidden"}`}>
      <button className="close-panel" onClick={onClose}>×</button>

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
