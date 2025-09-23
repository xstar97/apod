import React, { useEffect, useState, useRef } from "react";
import "./InfoPanel.css";

// --- Move these outside component to fix ESLint dependency warnings ---
const alienChars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";

const getRandomChar = () =>
  alienChars[Math.floor(Math.random() * alienChars.length)];

const initAlienText = (text) =>
  text.split("").map(() => getRandomChar()).join("");

// --- decodeText utility (already outside component) ---
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

const InfoPanel = ({ data, open, onClose }) => {
  const panelRef = useRef(null);

  const [displayTitle, setDisplayTitle] = useState(initAlienText(data.title));
  const [displayDate, setDisplayDate] = useState(initAlienText(data.date));
  const [displayDesc, setDisplayDesc] = useState(initAlienText(data.explanation));
  const [displayCopyRight, setDisplayCopyRight] = useState(
    data.copyright ? initAlienText(data.copyright) : ""
  );
  const [decoding, setDecoding] = useState(false);

  useEffect(() => {
    if (!open || !panelRef.current) return;

    const panelNode = panelRef.current;

    const handleTransitionEnd = () => {
      setDecoding(true);

      const titleArray = data.title.split("").map(() => getRandomChar());
      const dateArray = data.date.split("").map(() => getRandomChar());
      const descArray = data.explanation.split("").map(() => getRandomChar());
      const copyRightArray = data.copyright
        ? data.copyright.split("").map(() => getRandomChar())
        : [];

      // Sequential decoding
      decodeText(titleArray, data.title, setDisplayTitle, 8, 25)
        .then(() => decodeText(dateArray, data.date, setDisplayDate, 6, 20))
        .then(() => {
          if (copyRightArray.length) {
            return decodeText(
              copyRightArray,
              data.copyright,
              setDisplayCopyRight,
              6,
              20
            );
          }
        })
        .then(() =>
          decodeText(descArray, data.explanation, setDisplayDesc, 12, 15)
        );

      panelNode.removeEventListener("transitionend", handleTransitionEnd);
    };

    panelNode.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      panelNode.removeEventListener("transitionend", handleTransitionEnd);
      // Reset text to alien glyphs on close
      setDisplayTitle(initAlienText(data.title));
      setDisplayDate(initAlienText(data.date));
      setDisplayDesc(initAlienText(data.explanation));
      setDisplayCopyRight(
        data.copyright ? initAlienText(data.copyright) : ""
      );
      setDecoding(false);
    };
  }, [open, data]); // ESLint-clean now

  return (
    <div
      ref={panelRef}
      className={`info-panel ${open ? "open" : "hidden"}`}
    >
      <button className="close-panel" onClick={onClose}>
        ×
      </button>

      <h1 className={`alien-glitch ${decoding ? "active" : ""}`}>
        {displayTitle}
      </h1>
      <p className={`alien-glitch ${decoding ? "active" : ""}`}>
        {displayDate}
      </p>
      {displayCopyRight && (
        <p className={`alien-glitch ${decoding ? "active" : ""}`}>
          {displayCopyRight}
        </p>
      )}
      <div className="description-container">
        <div className="description-content alien-glitch active">
          {displayDesc}
        </div>
        <div className="fade-overlay"></div>
      </div>
    </div>
  );
};

export default InfoPanel;
