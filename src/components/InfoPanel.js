import React, { useEffect, useState } from "react";
import "./InfoPanel.css";

const InfoPanel = ({ data, open }) => {
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayDate, setDisplayDate] = useState("");
  const [displayDesc, setDisplayDesc] = useState("");

  const [decoding, setDecoding] = useState(false); // track if decoding is happening

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

    const interval = setInterval(() => {
      let done = true;

      if (ti < data.title.length) {
        titleArray[ti] = data.title[ti];
        setDisplayTitle([...titleArray].join(""));
        ti++;
        done = false;
      }
      if (di < data.date.length) {
        dateArray[di] = data.date[di];
        setDisplayDate([...dateArray].join(""));
        di++;
        done = false;
      }
      if (desci < data.explanation.length) {
        descArray[desci] = data.explanation[desci];
        setDisplayDesc([...descArray].join(""));
        desci++;
        done = false;
      }

      if (done) setDecoding(false); // stop shimmer once done
    }, 50);

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
