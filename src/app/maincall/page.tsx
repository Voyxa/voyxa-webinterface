"use client";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import AudioVisualizer from "../component/sketch";
import Button from "../component/controllButton";

const callRecordings = [
  { id: 1, duration: "10:34", date: "2024-07-01" },
  { id: 2, duration: "05:26", date: "2024-07-02" },
  { id: 3, duration: "12:15", date: "2024-07-03" },
];

const simulatedSpeechCaptions: { [key: string]: string[] } = {
  en: [
    "Welcome to the Help Desk AI Bot!",
    "How can I assist you today?",
    "Please hold on while I transfer your call.",
  ],
  es: [
    "¡Bienvenido al Bot de Ayuda!",
    "¿Cómo puedo ayudarte hoy?",
    "Por favor, espere mientras transfiero su llamada.",
  ],
  fr: [
    "Bienvenue sur le bot d'assistance!",
    "Comment puis-je vous aider aujourd'hui?",
    "Veuillez patienter pendant que je transfère votre appel.",
  ],
};
let mediaRecorder: MediaRecorder;
let audioChunks: Blob[] = [];

const MainCallPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [language, setLanguage] = useState("en");
  const [captionText, setCaptionText] = useState(
    simulatedSpeechCaptions["en"][0]
  );

  const [recordingState, setRecordingState] = useState("stopped"); // 'recording', 'paused', 'stopped'
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordings, setRecordings] = useState<string[]>([]);

  const [seconds, setSeconds] = useState(0);

  const toggleModal = () => {
    setOpen(!open);
  };

  const toggleCaptions = () => {
    setCaptionsEnabled(!captionsEnabled);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    setCaptionText(simulatedSpeechCaptions[newLanguage][0]);
  };

  useEffect(() => {
    if (captionsEnabled) {
      const interval = setInterval(() => {
        const captions = simulatedSpeechCaptions[language];
        setCaptionText(captions[Math.floor(Math.random() * captions.length)]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [captionsEnabled, language]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const remainingSeconds = secs % 60;
    return `${hours.toString().padStart(2, "0")}:${remainingMinutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const url = URL.createObjectURL(audioBlob);
        setRecordings((prev) => [...prev, url]);
        audioChunks = [];
      };
    });
  }, []);

  const toggleRecording = () => {
    if (recordingState === "stopped") {
      mediaRecorder.start();
      setRecordingState("recording");
    } else if (recordingState === "recording") {
      mediaRecorder.pause();
      setRecordingState("paused");
    } else if (recordingState === "paused") {
      mediaRecorder.resume();
      setRecordingState("recording");
    }
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecordingState("stopped");
    setAudioUrl(null);
  };

  const playAudio = (url: string) => {
    setAudioUrl(url);
  };
  return (
    <div className="bg-white h-[100vh]">
      <div className="mx-auto w-full h-[100vh]">
        <div className="relative overflow-hidden h-[100vh]">
          <div className="absolute inset-0 h-[100vh]">
            <Image
              src="/background.jpg"
              alt="Description of image"
              width={100}
              height={300}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="top-0 absolute inset-x-0 bg-black bg-opacity-0 p-6 backdrop-blur backdrop-filter lg:inset-x-auto lg:inset-y-0 lg:w-[75%] lg:flex-col lg:items-start lg:rounded-br-none lg:bottom-0">
            <div className="text-[35px] text-white text-lg text-center">
              {formatTime(seconds)}
            </div>
            <div className="h-full mb-[-220px]">
              <AudioVisualizer />
            </div>
            <div>
              {captionsEnabled && (
                <section className="w-full flex justify-center items-center mb-4">
                  <div className="bg-gray-800 text-white rounded-lg p-4 shadow-lg">
                    {captionText}
                  </div>
                </section>
              )}
            </div>
            <div className="p-5 flex justify-center">
              <div className="space-x-4 flex">
                <Button type="mute" />
                <Link href="/calling">
                  <Button type="endCall" />
                </Link>

                <Button type="hold" onClick={toggleModal} />
              </div>
            </div>
          </div>
          <div className="bottom-0 absolute inset-x-0 bg-black bg-opacity-30 p-6 backdrop-blur backdrop-filter lg:inset-x-auto lg:inset-y-0 lg:w-[25%] lg:flex-col lg:items-start lg:rounded-br-none lg:right-0">
            <div className="rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 px-4 py-3 h-[30%] w-full mb-2 flex items-center justify-center">
              <p className="text-gray-300 text-[30px]">AI Analysis</p>
            </div>
            <div className="rounded-md border border-white border-opacity-25 bg-white bg-opacity-0 px-4 py-3 h-[70%] w-full mt-2">
              <p className="text-gray-300 text-[30px] mb-2">
                Do you want to record?
              </p>

              <div>
                <div className="flex space-x-2 mb-2">
                  <button
                    onClick={toggleRecording}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {recordingState === "recording"
                      ? "Pause"
                      : recordingState === "paused"
                      ? "Continue"
                      : "Start"}
                  </button>
                  <button
                    onClick={stopRecording}
                    disabled={recordingState === "stopped"}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Stop
                  </button>
                </div>
                {audioUrl && (
                  <audio
                    src={audioUrl}
                    controls
                    autoPlay
                    className="mb-2 mt-6 w-full"
                  />
                )}
                <div className="mt-6">
                  {recordings.map((recording, index) => (
                    <div key={index}>
                      <button
                        onClick={() => playAudio(recording)}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
                      >
                        Play Recording {index + 1}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog className="relative z-10" open={open} onClose={toggleModal}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative w-[500px] transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Voice Settings */}
                <div>
                  <h3 className="text-xl font-semibold mb-2">Voice Settings</h3>
                  <label className="block mb-2">
                    <span className="text-gray-700">Voice</span>
                    <select className="block w-full mt-1 border rounded-md p-2">
                      <option>Default</option>
                      <option>Calm</option>
                      <option>Energetic</option>
                    </select>
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Tone</span>
                    <select className="block w-full mt-1 border rounded-md p-2">
                      <option>Neutral</option>
                      <option>Friendly</option>
                      <option>Professional</option>
                    </select>
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Emotions</span>
                    <select className="block w-full mt-1 border rounded-md p-2">
                      <option>Neutral</option>
                      <option>Happy</option>
                      <option>Sad</option>
                    </select>
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Gender</span>
                    <select className="block w-full mt-1 border rounded-md p-2">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </label>
                </div>
                {/* SLA Management */}
                <div>
                  <h3 className="text-xl font-semibold mb-2">SLA Management</h3>
                  <label className="block mb-2">
                    <span className="text-gray-700">Response Time</span>
                    <input
                      type="number"
                      className="block w-full mt-1 border rounded-md p-2"
                      placeholder="Minutes"
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Resolution Time</span>
                    <input
                      type="number"
                      className="block w-full mt-1 border rounded-md p-2"
                      placeholder="Minutes"
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Escalation Time</span>
                    <input
                      type="number"
                      className="block w-full mt-1 border rounded-md p-2"
                      placeholder="Minutes"
                    />
                  </label>
                </div>
                {/* Caption Settings */}
                <div className="col-span-2">
                  <h3 className="text-xl font-semibold mb-2">
                    Caption Settings
                  </h3>
                  <label className="block mb-2">
                    <span className="text-gray-700">Enable Captions</span>
                    <input
                      type="checkbox"
                      className="block mt-1"
                      checked={captionsEnabled}
                      onChange={toggleCaptions}
                    />
                  </label>
                  <label className="block mb-2">
                    <span className="text-gray-700">Language</span>
                    <select
                      className="block w-full mt-1 border rounded-md p-2"
                      value={language}
                      onChange={handleLanguageChange}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </label>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MainCallPage;
