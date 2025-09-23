import React, { useEffect, useState, useRef } from "react";
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

  const panelRef = useRef(null);

  useEffect(() => {
    if (!open || !panelRef.current) return;

    const handleTransitionEnd = () => {
      setDecoding(true);

      const decodeText = (arr, text, setFn, steps = 10, charDelay = 30) =>
        new Promise((resolve) => {
          let index = 0;
          const interval = setInterval(() => {
            const step = Math.max(1, Math.floor(text.length / steps));
            let done = true;
            for (let i = 0; i < step && index < text.length; i++, index++) {
              arr[index] = text[index];
            }
            setFn([...arr].join(""));
            if (index < text.length) done = false;
            if (done) {
              clearInterval(interval);
              resolve();
            }
          }, charDelay);
        });

      const titleArray = data.title.split("").map(() => getRandomChar());
      const dateArray = data.date.split("").map(() => getRandomChar());
      const descArray = data.explanation.split("").map(() => getRandomChar());
      const copyRightArray = data.copyright
        ? data.copyright.split("").map(() => getRandomChar())
        : [];

      // Staggered sequential decoding
      decodeText(titleArray, data.title, setDisplayTitle, 8, 30);
      setTimeout(() => decodeText(dateArray, data.date, setDisplayDate, 8, 25), 100);
      setTimeout(() => decodeText(descArray, data.explanation, setDisplayDesc, 12, 20), 200);
      if (copyRightArray.length) {
        setTimeout(() => decodeText(copyRightArray, data.copyright, setDisplayCopyRight, 8, 25), 400);
      }

      panelRef.current.removeEventListener("transitionend", handleTransitionEnd);
    };

    panelRef.current.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      if (panelRef.current)
        panelRef.current.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [open, data]);

  return (
    <div ref={panelRef} className={`info-panel ${open ? "open" : "hidden"}`}>
      <button className="close-panel" onClick={onClose}>
        ×
      </button>
      <h1 className={`alien-glitch ${decoding ? "active fade-in" : ""}`}>{displayTitle}</h1>
      <p className={`alien-glitch ${decoding ? "active fade-in" : ""}`}>{displayDate}</p>
      {displayCopyRight && (
        <p className={`alien-glitch ${decoding ? "active fade-in" : ""}`}>{displayCopyRight}</p>
      )}
      <div className="description-container">
        <p className={`alien-glitch ${decoding ? "active fade-in" : ""}`}>{displayDesc}</p>
      </div>
    </div>
  );
};

export default InfoPanel;
