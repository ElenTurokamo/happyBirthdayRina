import React, { useEffect, useState } from "react";
import "../Cake.css";

export default function Cake({ blown, onBlow }) {
  const frames = [
    require("../sprites/Cake_1_candle.png"),
    require("../sprites/Cake_2_candle.png"),
    require("../sprites/Cake_3_candle.png"),
    require("../sprites/Cake_4_candle.png"),
    require("../sprites/Cake_5_candle.png"),
    require("../sprites/Cake_6_candle.png"),
    require("../sprites/Cake_7_candle.png"),
  ];

  const blownFrame = require("../sprites/Cake_1_no_candle.png");
  const [frame, setFrame] = useState(0);

  // 🔥 анимация пламени
  useEffect(() => {
    if (blown) return;
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 150);
    return () => clearInterval(interval);
  }, [blown, frames.length]);

  // 🎤 отслеживание дуновения через микрофон
  useEffect(() => {
    if (blown) return;

    let audioContext;
    let analyser;
    let dataArray;
    let source;

    const initMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        const detectBlow = () => {
          analyser.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b, 0) / bufferLength;

          // 🎯 порог громкости, при котором "задуваем" свечу
          if (avg > 60) {
            onBlow();
          } else {
            requestAnimationFrame(detectBlow);
          }
        };

        detectBlow();
      } catch (err) {
        console.error("Ошибка доступа к микрофону:", err);
      }
    };

    initMic();

    return () => {
      if (audioContext) audioContext.close();
    };
  }, [blown, onBlow]);

  return (
    <div className="cake-container" onClick={() => !blown && onBlow()}>
      <img
        src={blown ? blownFrame : frames[frame]}
        alt="cake"
        className={`cake-image ${blown ? "cake-fadeout" : ""}`}
      />
    </div>
  );
}
