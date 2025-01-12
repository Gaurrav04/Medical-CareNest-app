"use client";
import React, { useState, useEffect } from "react";

interface TransitionalTextProps {
  TEXTS: string[];
  className?: string;
}

export default function TransitionalText({ TEXTS, className }: TransitionalTextProps) {
  const [index, setIndex] = useState(0);
  const [transitionState, setTransitionState] = useState("entering"); // 'entering', 'exiting'

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTransitionState("exiting"); // Start exiting animation

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % TEXTS.length); // Update text
        setTransitionState("entering"); // Start entering animation
      }, 500); // Match the exiting duration
    }, 2000); // Change every 2 seconds

    return () => clearInterval(intervalId);
  }, [TEXTS.length]);

  return (
    <div
      style={{
        position: "relative",
        height: "2em", // Adjust based on font size
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start", // Keep the text aligned to the left
        width: "100%", // Ensure container spans full width
      }}
    >
      <span
        className={className}
        style={{
          position: "absolute",
          transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out", // Faster transition duration
          transform:
            transitionState === "entering"
              ? "translateY(0)"
              : "translateY(-100%)", // Vertical transition
          opacity: transitionState === "entering" ? 1 : 0, // Fade effect
          whiteSpace: "nowrap",
        }}
      >
        {TEXTS[index]}
      </span>
    </div>
  );
}
