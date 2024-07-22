"use client";

import { useState, useRef, useEffect } from "react";

const Numberpay = () => {
  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        inputValue === ""
      ) {
        setIsInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputValue]);

  return (
    <div className="flex min-h-full flex-1">
      <div className="relative hidden w-0 flex-1 lg:block bg-[#f5f3ff]"></div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="h-[100vh] bg-white shadow-lg"></div>
      </div>
    </div>
  );
};

export default Numberpay;
