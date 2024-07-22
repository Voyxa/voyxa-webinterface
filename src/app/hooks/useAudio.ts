"use client";
import { useEffect, useRef, useState } from "react";

const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);

  useEffect(() => {
    const initAudio = () => {
      try {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            const source =
              audioContextRef.current!.createMediaStreamSource(stream);
            analyserRef.current = audioContextRef.current!.createAnalyser();
            source.connect(analyserRef.current);

            analyserRef.current.fftSize = 256;
            const bufferLength = analyserRef.current.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);

            const getAudioData = () => {
              if (analyserRef.current && dataArrayRef.current) {
                analyserRef.current.getByteFrequencyData(dataArrayRef.current);
                setAudioData(new Uint8Array(dataArrayRef.current));
                requestAnimationFrame(getAudioData);
              }
            };

            getAudioData();
          })
          .catch((err) => {
            console.error("Error accessing audio stream:", err);
          });
      } catch (err) {
        console.error("Error initializing audio:", err);
      }
    };

    initAudio();

    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  return audioData;
};

export default useAudio;
