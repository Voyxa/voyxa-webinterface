"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  faVolumeUp,
  faGlobe,
  faBolt,
  faClosedCaptioning,
} from "@fortawesome/free-solid-svg-icons";

const SettingsCard = () => {
  const [volume, setVolume] = useState(50);
  const [speed, setSpeed] = useState(1);
  const [language, setLanguage] = useState("English");
  const [captions, setCaptions] = useState(false);

  return (
    <div className="w-[500px] h-[500px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 flex">
      <div className="flex items-center w-100">
        <div className="space-y-10 w-full">
          {/* Volume Control */}
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon
              icon={faVolumeUp}
              className="h-6 w-6 text-blue-500"
            />
            <div className="flex-1">
              <label
                htmlFor="volume"
                className="block text-sm font-medium text-gray-700"
              >
                Volume
              </label>
              <input
                id="volume"
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-[340px] h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <span>{volume}%</span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon
              icon={faGlobe}
              className="h-6 w-6 text-green-500"
            />
            <div className="flex-1">
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700"
              >
                Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="hover:cursor-pointer w-full mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>Italy</option>
                <option>German</option>
              </select>
            </div>
          </div>

          {/* Speed Control */}
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon
              icon={faBolt}
              className="h-6 w-6 text-yellow-500"
            />
            <div className="flex-1">
              <label
                htmlFor="speed"
                className="block text-sm font-medium text-gray-700"
              >
                Speed
              </label>
              <input
                id="speed"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-[340px] h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <span>{speed}x</span>
          </div>

          {/* Captions Toggle */}
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon
              icon={faClosedCaptioning}
              className="h-6 w-6 text-red-500"
            />
            <div className="flex justify-between w-full items-center">
              <label
                htmlFor="captions"
                className="block text-sm font-medium text-gray-700"
              >
                Captions
              </label>
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle"
                  checked={captions}
                  onChange={(e) => setCaptions(e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-4"
                />
                <label
                  htmlFor="toggle"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
          </div>
          <Link href="/maincall" className="submit-btn">
            <button type="submit">Start call</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsCard;
