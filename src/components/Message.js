import React from "react";
import "../Message.css";
import birthdayImage from "./sprites/Happy-Birthday.png";

export default function Message() {
  return (
    <div className="birthday-text-container">
      <img
        src={birthdayImage}
        alt="Happy Birthday!"
        className="birthday-text-image"
      />
    </div>
  );
}
