import React, { useEffect, useState } from "react";
import "./Loading.css";

const alienChars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";

// helper to generate alien text
const randomAlienText = (length) =>
  Array.from({ length }, () => alienChars[Math.floor(Math.random() * alienChars.length)]).join("");

// default “skeleton” info
const defaultData = {
  title: "⟊⟒⟟⌖⋉ ⋆⍾✧",
  date: "☌☍-⟟⋇-⚲☄",
  description:
    "⟊⟒ ⍾⋇ ⧖⚲ ☌☍⌬ ✧✦✴⋆ ✪✫✬✭✮✯ ✰☄ ⍾⧖ ⚲☌ ☍⌬✧✦ ⋆✪✫...",
};

const LoadingComponent = () => {
  const [title, setTitle] = useState(defaultData.title);
  const [date, setDate] = useState(defaultData.date);
  const [description, setDescription] = useState(defaultData.description);

  // glitch update to keep it alive
  useEffect(() => {
    const interval = setInterval(() => {
      setTitle(randomAlienText(defaultData.title.length));
      setDate(randomAlienText(defaultData.date.length));
      setDescription(randomAlienText(defaultData.description.length));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="image-container" style={{ margin: "20px" }}>
      {/* Title */}
      <h1 id="gallery-title" className="alien-glitch">
        {title}
      </h1>

      {/* Date */}
      <p id="gallery-date" className="alien-glitch">
        {date}
      </p>

      {/* Fake copyright */}
      <p id="gallery-copyright" className="alien-glitch">
        ⧖⚲ ⟊⟒⟟⌖⋉
      </p>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Media placeholder */}
        <div
          className="skeleton"
          style={{
            width: "512px",
            height: "512px",
            margin: "10px",
            borderRadius: "8px",
            background: "rgba(0,255,0,0.1)",
            border: "1px solid #0f0",
          }}
        ></div>

        {/* Description container */}
        <div
          id="description-container"
          style={{
            width: "512px",
            margin: "10px",
            padding: "10px",
            border: "1px solid #0f0",
            background: "rgba(0,255,0,0.05)",
          }}
        >
          <p id="full-description" className="alien-glitch">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
