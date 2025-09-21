import React, { useEffect, useState } from "react";
import "./InfoPanel.css";

const InfoPanel = ({ data, open }) => {
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayDate, setDisplayDate] = useState("");
  const [displayDesc, setDisplayDesc] = useState("");
  const [displayCopyRight, setDisplayCopyRight] = useState("");
  const [decoding, setDecoding] = useState(false);

  useEffect(() => {
    if (!open) return;

    setDecoding(true);

    const alienChars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";
    const getRandomChar = () => alienChars[Math.floor(Math.random() * alienChars.length)];

    // Initialize arrays with random alien chars
    const initArray = (text) => text.split("").map(() => getRandomChar());

    let titleArray = initArray(data.title);
    let dateArray = initArray(data.date);
    let descArray = initArray(data.explanation);
    let copyArray = data.copyright ? initArray(data.copyright) : [];

    setDisplayTitle(titleArray.join(""));
    setDisplayDate(dateArray.join(""));
    setDisplayDesc(descArray.join(""));
    setDisplayCopyRight(copyArray.join(""));

    // Generic decode function
    const decodeText = (sourceArray, targetString, step) => {
      for (let i = 0; i < step && i < targetString.length; i++) {
        sourceArray[i] = targetString[i];
      }
      return sourceArray;
    };

    let ti = 0, di = 0, desci = 0, ci = 0;

    const interval = setInterval(() => {
      let done = true;

      // Update each field dynamically
      const titleStep = Math.max(1, Math.floor(data.title.length / 8));
      titleArray = decodeText(titleArray, data.title, titleStep + ti);
      ti += titleStep;
      if (ti < data.title.length) done = false;
      setDisplayTitle([...titleArray].join(""));

      const dateStep = Math.max(1, Math.floor(data.date.length / 8));
      dateArray = decodeText(dateArray, data.date, dateStep + di);
      di += dateStep;
      if (di < data.date.length) done = false;
      setDisplayDate([...dateArray].join(""));

      const descStep = Math.max(1, Math.floor(data.explanation.length / 15));
      descArray = decodeText(descArray, data.explanation, descStep + desci);
      desci += descStep;
      if (desci < data.explanation.length) done = false;
      setDisplayDesc([...descArray].join(""));

      if (copyArray.length > 0) {
        const copyStep = Math.max(1, Math.floor(data.copyright.length / 8));
        copyArray = decodeText(copyArray, data.copyright, copyStep + ci);
        ci += copyStep;
        if (ci < data.copyright.length) done = false;
        setDisplayCopyRight([...copyArray].join(""));
      }

      if (done) setDecoding(false);
    }, 50);

    return () => clearInterval(interval);
  }, [open, data]);

  return (
    <div className={`info-panel ${open ? "open" : ""}`}>
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
