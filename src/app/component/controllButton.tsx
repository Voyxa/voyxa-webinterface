import { useState } from "react";

interface ButtonProps {
  type: "mute" | "endCall" | "hold";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, onClick }) => {
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteClick = () => {
    if (type === "mute") {
      setIsMuted(!isMuted);
    }
    if (onClick) onClick();
  };

  const renderIcon = () => {
    switch (type) {
      case "mute":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-8 h-8 ${isMuted ? "text-red-500" : "text-gray-700"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 13v-2a7 7 0 00-14 0v2m14 0a9 9 0 11-18 0v-2m4 10h.01M12 14v8m0-8H8m4 0h4"
            />
            {isMuted && (
              <line
                x1="1"
                y1="1"
                x2="23"
                y2="23"
                className="absolute w-full h-full stroke-current stroke-2"
              />
            )}
          </svg>
        );
      case "endCall":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "hold":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM4.5 12a7.5 7.5 0 0113.36-4.752m0 9.504A7.5 7.5 0 014.5 12M12 2.25v1.5m0 16.5v1.5m9.75-9.75h-1.5M2.25 12h1.5m14.694 4.304l-1.06-1.06m-11.88 0l1.06-1.06m0-7.748l-1.06 1.06m11.88 0l1.06 1.06"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative w-16 h-16 flex justify-center items-center rounded-full cursor-pointer transition-transform transform hover:scale-110 ${
        type === "endCall" ? "bg-red-500" : "bg-gray-200"
      }`}
      onClick={handleMuteClick}
    >
      {renderIcon()}
      {type === "mute" && isMuted && (
        <div className="absolute w-8 h-0.5 bg-red-500 rotate-45"></div>
      )}
    </div>
  );
};

export default Button;
