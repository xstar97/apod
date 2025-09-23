import React, { useEffect, useState, useRef } from "react";
import "./InfoPanel.css";

const InfoPanel = ({ data, open, onClose }) => {
  const panelRef = useRef(null);
  const alienChars = "⟊⟒⟟⌖⋉⋇⍾⌬⎅⌖⍙⋉⋇"; // alien charset

  const [decodedText, setDecodedText] = useState("");
  const [setIsDecoding] = useState(false);

  // Check if text is encoded (contains alien chars)
  const isEncoded = (text) => [...text].some((char) => alienChars.includes(char));

  // Decode animation
  const decodeText = (encoded) => {
    setIsDecoding(true);
    setDecodedText(""); // reset
    let output = "";
    let index = 0;

    const interval = setInterval(() => {
      if (index < encoded.length) {
        output += encoded[index];
        setDecodedText(output);
        index++;
      } else {
        clearInterval(interval);
        setIsDecoding(false);
      }
    }, 40);
  };

  // Handle panel open
  useEffect(() => {
    if (open && data?.description) {
      if (isEncoded(data.description)) {
        decodeText(data.description);
      } else {
        setDecodedText(data.description);
      }
    }
  }, [open, data]);

  // Reset text when panel closes
  useEffect(() => {
    if (!open) {
      setDecodedText("");
      setIsDecoding(false);
    }
  }, [open]);

  // Handle fade overlay for description scroll
  const [isScrollable, setIsScrollable] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    if (descRef.current) {
      const el = descRef.current;
      setIsScrollable(el.scrollHeight > el.clientHeight);

      const handleScroll = () => {
        setIsScrolledToBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 5);
      };

      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [decodedText, open]);

  return (
    <div ref={panelRef} className={`info-panel ${open ? "open" : "hidden"}`}>
      <button className="close-panel" onClick={onClose}>
        ✖
      </button>
      <h2>{data?.title}</h2>
      <div className="description-container" ref={descRef}>
        <div className="description-content">
          {decodedText}
        </div>
        {isScrollable && !isScrolledToBottom && <div className="fade-overlay"></div>}
      </div>
    </div>
  );
};

export default InfoPanel;
