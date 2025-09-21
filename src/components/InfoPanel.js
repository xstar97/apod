import React, { useEffect, useState } from "react";
import "./InfoPanel.css";

const InfoPanel = ({ data, open }) => {
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayDate, setDisplayDate] = useState("");
  const [displayDesc, setDisplayDesc] = useState("");
  const [decoding, setDecoding] = useState(false);

  useEffect(() => {
    if (!open) return;

    setDecoding(true);

    const alienChars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";
    const getRandomChar = () => alienChars[Math.floor(Math.random() * alienChars.length)];

    // Initialize each string with random alien chars
    let titleArray = data.title.split("").map(() => getRandomChar());
    let dateArray = data.date.split("").map(() => getRandomChar());
    let descArray = data.explanation.split("").map(() => getRandomChar());

    setDisplayTitle(titleArray.join(""));
    setDisplayDate(dateArray.join(""));
    setDisplayDesc(descArray.join(""));

    let ti = 0, di = 0, desci = 0;

    // Adjust speed: more characters per interval for longer text
    const interval = setInterval(() => {
      let done = true;

      // For title
      const titleStep = Math.max(1, Math.floor(data.title.length / 8)); // 8 steps total
      for (let i = 0; i < titleStep && ti < data.title.length; i++, ti++) {
        titleArray[ti] = data.title[ti];
      }
      if (ti < data.title.length) done = false;
      setDisplayTitle([...titleArray].join(""));

      // For date
      const dateStep = Math.max(1, Math.floor(data.date.length / 8));
      for (let i = 0; i < dateStep && di < data.date.length; i++, di++) {
        dateArray[di] = data.date[di];
      }
      if (di < data.date.length) done = false;
      setDisplayDate([...dateArray].join(""));

      // For description
      const descStep = Math.max(1, Math.floor(data.explanation.length / 15)); // faster for long text
      for (let i = 0; i < descStep && desci < data.explanation.length; i++, desci++) {
        descArray[desci] = data.explanation[desci];
      }
      if (desci < data.explanation.length) done = false;
      setDisplayDesc([...descArray].join(""));

      if (done) setDecoding(false);
    }, 50); // small interval for smooth animation

    return () => clearInterval(interval);
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
