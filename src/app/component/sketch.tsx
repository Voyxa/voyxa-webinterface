"use client";
import React, { useEffect, useRef } from "react";
import useAudio from "../hooks/useAudio";

const AudioVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioData = useAudio();

  useEffect(() => {
    if (!canvasRef.current || !audioData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = 2;
        const barSpacing = 3;
        const barCount = Math.floor(canvas.width / (barWidth + barSpacing));
        const centerY = canvas.height / 2;

        for (let i = 0; i < barCount; i++) {
          const audioIndex = Math.floor((i / barCount) * audioData.length);
          const amplitude = audioData[audioIndex] / 255;
          const barHeight = (amplitude * canvas.height) / 2;

          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(
            i * (barWidth + barSpacing),
            centerY - barHeight / 2,
            barWidth,
            barHeight
          );
        }

        requestAnimationFrame(draw);
      } catch (err) {
        console.error("Error during drawing:", err);
      }
    };

    draw();
  }, [audioData]);

  return (
    <div className="flex justify-center items-center h-[400px]">
      <canvas ref={canvasRef} className="w-full h-full max-w-4xl"></canvas>
    </div>
  );
};

export default AudioVisualizer;
