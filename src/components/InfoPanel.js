import React, { useEffect, useState } from "react";
import "./InfoPanel.css";

const InfoPanel = ({ data, open }) => {
  const alienChars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";
  const getRandomChar = () => alienChars[Math.floor(Math.random() * alienChars.length)];

  // Helper to create alien text array
  const initAlienText = (text) => text.split("").map(() => getRandomChar());

  const [displayTitle, setDisplayTitle] = useState(initAlienText(data.title).join(""));
  const [displayDate, setDisplayDate] = useState(initAlienText(data.date).join(""));
  const [displayDesc, setDisplayDesc] = useState(initAlienText(data.explanation).join(""));
  const [displayCopyRight, setDisplayCopyRight] = useState(
    data.copyright ? initAlienText(data.copyright).join("") : ""
  );

  const [decoding, setDecoding] = useState(false);

  useEffect(() => {
    if (!open) return; // Only decode when panel is opened
    setDecoding(true);

    let titleArray = displayTitle.split("");
    let dateArray = displayDate.split("");
    let descArray = displayDesc.split("");
    let copyArray = displayCopyRight.split("");

    let ti = 0, di = 0, desci = 0, ci = 0;

    const decodeText = (sourceArray, targetString, step) => {
      for (let i = 0; i < step && i < targetString.length; i++) {
        sourceArray[i] = targetString[i];
      }
      return sourceArray;
    };

    const interval = setInterval(() => {
      let done = true;

      const titleStep = Math.max(1, Math.floor(data.title.length / 8));
      titleArray = decodeText(titleArray, data.title, ti + titleStep);
      ti += titleStep;
      if (ti < data.title.length) done = false;
      setDisplayTitle([...titleArray].join(""));

      const dateStep = Math.max(1, Math.floor(data.date.length / 8));
      dateArray = decodeText(dateArray, data.date, di + dateStep);
      di += dateStep;
      if (di < data.date.length) done = false;
      setDisplayDate([...dateArray].join(""));

      const descStep = Math.max(1, Math.floor(data.explanation.length / 15));
      descArray = decodeText(descArray, data.explanation, desci + descStep);
      desci += descStep;
      if (desci < data.explanation.length) done = false;
      setDisplayDesc([...descArray].join(""));

      if (copyArray.length > 0) {
        const copyStep = Math.max(1, Math.floor(data.copyright.length / 8));
        copyArray = decodeText(copyArray, data.copyright, ci + copyStep);
        ci += copyStep;
        if (ci < data.copyright.length) done = false;
        setDisplayCopyRight([...copyArray].join(""));
      }

      if (done) setDecoding(false);
    }, 40); // faster decoding

    return () => clearInterval(interval);
  }, [open, data]);

  return (
    <div className={`info-panel ${open ? "open" : "hidden"}`}>
      <h1 className={`alien-glitch ${decoding ? "active" : ""}`}>{displayTitle}</h1>
      <p className={`alien-glitch ${decoding ? "active" : ""}`}>{displayDate}</p>
      {data.copyright && (
        <p className={`alien-glitch ${decoding ? "active" : ""}`}>{displayCopyRight}</p>
      )}
      <div className="description-container">
        <p className={`alien-glitch ${decoding ? "active" : ""}`}>{displayDesc}</p>
      </div>
    </div>
  );
};

export default InfoPanel;
