import React, { useEffect, useState } from "react";
import "./InfoPanel.css";

const InfoPanel = ({ data, open }) => {
  const [displayTitle, setDisplayTitle] = useState("");
  const [displayDate, setDisplayDate] = useState("");
  const [displayDesc, setDisplayDesc] = useState("");

  useEffect(() => {
    if (!open) return;

    // Start alien decode animation
    let ti = 0, di = 0, desci = 0;
    const alienChars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";

    const interval = setInterval(() => {
      if (ti < data.title.length) {
        setDisplayTitle(prev => prev.substring(0, ti) + data.title[ti++] + prev.substring(ti));
      }
      if (di < data.date.length) {
        setDisplayDate(prev => prev.substring(0, di) + data.date[di++] + prev.substring(di));
      }
      if (desci < data.explanation.length) {
        setDisplayDesc(prev => prev.substring(0, desci) + data.explanation[desci++] + prev.substring(desci));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [open, data]);

  return (
    <div className={`info-panel ${open ? "open" : ""}`}>
      <h1 className={`alien-glitch ${open ? "active" : ""}`}>{displayTitle}</h1>
      <p className={`alien-glitch ${open ? "active" : ""}`}>{displayDate}</p>
      {data.copyright && <p className={`alien-glitch ${open ? "active" : ""}`}>Copyright: {data.copyright}</p>}
      <div className="description-container">
        <p className={`alien-glitch ${open ? "active" : ""}`}>{displayDesc}</p>
      </div>
    </div>
  );
};

export default InfoPanel;
