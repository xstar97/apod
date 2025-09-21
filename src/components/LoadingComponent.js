import React from "react";
import "./Loading.css";

const LoadingComponent = ({ realData }) => {
  return (
    <div className="loading-container">
      <h1 className="alien-glitch">{realData.title}</h1>
      <p className="alien-glitch">{realData.date}</p>
      <p className="alien-glitch">{realData.copyright}</p>
      <div className="description-container">
        <p className="alien-glitch">{realData.explanation}</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
