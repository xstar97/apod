import React, { useEffect, useState } from "react";
import "./Loading.css";

const randomAlienText = (length) => {
  const chars = "⟊⟒⟟⌖⋉⋇⍾⧖⚲☌☍⌬✧✦✴⋆✪✫✬✭✮✯✰☄";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

const LoadingComponent = () => {
  const [title, setTitle] = useState(randomAlienText(12));
  const [date, setDate] = useState(randomAlienText(8));
  const [description, setDescription] = useState(randomAlienText(60));

  // periodically mutate alien text for a glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTitle(randomAlienText(12));
      setDate(randomAlienText(8));
      setDescription(randomAlienText(60));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="loading-view"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "black",
        color: "#0f0",
        fontFamily: "monospace",
      }}
    >
      {/* Alien Title */}
      <h1 className="alien-glitch">{title}</h1>

      {/* Alien Date */}
      <p className="alien-glitch">{date}</p>

      {/* Alien Media Placeholder */}
      <div
        className="skeleton"
        style={{
          width: "512px",
          height: "512px",
          margin: "20px",
          borderRadius: "8px",
          background: "rgba(0,255,0,0.1)",
          border: "1px solid #0f0",
        }}
      ></div>

      {/* Alien Description */}
      <p
        className="alien-glitch"
        style={{
          width: "512px",
          textAlign: "left",
          padding: "10px",
          border: "1px solid #0f0",
          background: "rgba(0,255,0,0.05)",
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default LoadingComponent;
