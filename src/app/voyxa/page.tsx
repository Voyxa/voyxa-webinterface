"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import StartVoyxa from "./creatvoyxa";
import StepOne from "./stepOne";

export default function CreateVoyxa() {
  const [pageValue, setpageValue] = useState(0);

  const leftBtnClick = () => {
    if(pageValue>0) setpageValue(pageValue-1);
  };
  const rightBtnClick = () => {
    console.log(pageValue+1)
    if(pageValue== 4) setpageValue(0);
    else setpageValue(pageValue+1);
  };




  return (
    <>
      <div className=" h-full w-full bg-[#f9fafb]">
        <div className="flex ">
          {pageValue == 0 && <StartVoyxa />}
          {pageValue == 1 && <StepOne />}
          {pageValue == 2 && <StartVoyxa />}
          {pageValue == 3 && <StartVoyxa />}
          {pageValue == 4 && <StartVoyxa />}
        </div>
        <div className="flex justify-between items-center mb-8">

          <div className="m-8">
            {pageValue > 0 && <button className="bg-gray-600 text-white px-4 py-2 mr-2 rounded-lg" onClick={() => leftBtnClick()}>Back</button>}
          </div>
          <div className="m-8">
             {pageValue == 0 && <button className="bg-blue-600 text-white px-4 py-2 mr-2 rounded-lg" onClick={() => rightBtnClick()} >Create</button>}
             {pageValue > 0 && <button className="bg-blue-600 text-white px-4 py-2 mr-2 rounded-lg" onClick={() => rightBtnClick()} >Next</button>}
          </div>
        </div>
      </div>
    </>
  );
}
