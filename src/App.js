import React, { useEffect, useRef, useState } from "react";
import Cake from "../components/Cake.js";
import Confetti from "../components/Confetti.js";
import Message from "../components/Message.js";
import "../App.css";

export default function App() {
  const [blown, setBlown] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = true;
      audio.play().then(() => {
        setTimeout(() => {
          audio.muted = false; // включаем звук спустя пару секунд
        }, 1000);
      }).catch((err) => console.log("Автовоспроизведение заблокировано:", err));
    }
  }, []);

  return (
    <div className="birthday-wrapper">
      <Message />
      <Cake blown={blown} onBlow={() => setBlown(true)} />
      {blown && <Confetti pieces={100} duration={6000} />}

      <audio
        ref={audioRef}
        src={require("./assets/birthday-song.mp3")}
        loop
      />
    </div>
  );
}
