"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import StartVoyxa from "./creatvoyxa";
import StepOne from "./stepOne";

export default function CreateVoyxa() {
  const [pageValue, setpageValue] = useState(0);

  const leftBtnClick = () => {
    if (pageValue > 0) setpageValue(pageValue - 1);
  };
  const rightBtnClick = () => {
    console.log(pageValue + 1)
    if (pageValue == 4) setpageValue(0);
    else setpageValue(pageValue + 1);
  };

  return (
    <>
      <div className=" h-full w-full  ">
      <h2 className="text-3xl font-bold ">Create a Voyxa</h2>
  
        {pageValue == 0 &&
          <div className="flex ">
            <StartVoyxa />
          </div>
        }
        {pageValue > 0 &&
          <section className="text-gray-600 body-font">
            <div className="container px-10  mx-auto flex flex-wrap">
              <div className="flex flex-wrap w-full">
                <div className="lg:w-1/4 md:w-1/2 md:pr-10 md:py-6">
                  <div className="flex relative pb-12">
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500 inline-flex items-center justify-center text-white relative z-10">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Sales</h2>
                      <p className="leading-relaxed">VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche palo santo offal.</p>
                    </div>
                  </div>
                  <div className="flex relative pb-12">
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500 inline-flex items-center justify-center text-white relative z-10">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Agent Customization</h2>
                      <p className="leading-relaxed">Vice migas literally kitsch +1 pok pok. Truffaut hot chicken slow-carb health goth, vape typewriter.</p>
                    </div>
                  </div>
                  <div className="flex relative pb-12">
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500 inline-flex items-center justify-center text-white relative z-10">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <circle cx="12" cy="5" r="3"></circle>
                        <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                      </svg>
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Agent Knowledge Base</h2>
                      <p className="leading-relaxed">Coloring book nar whal glossier master cleanse umami. Salvia +1 master cleanse blog taiyaki.</p>
                    </div>
                  </div>
                  <div className="flex relative pb-12">
                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500 inline-flex items-center justify-center text-white relative z-10">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Flow Configuration</h2>
                      <p className="leading-relaxed">VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk bespoke try-hard cliche palo santo offal.</p>
                    </div>
                  </div>
                  <div className="flex relative">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500 inline-flex items-center justify-center text-white relative z-10">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                    </div>
                    <div className="flex-grow pl-4">
                      <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Voyxa Name</h2>
                      <p className="leading-relaxed">Pitchfork ugh tattooed scenester echo park gastropub whatever cold-pressed retro.</p>
                    </div>
                  </div>
                </div>
                <div className="lg:w-3/4 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12">
                  {pageValue == 1 && <StepOne />}
                  {pageValue == 2 && <StartVoyxa />}
                  {pageValue == 3 && <StartVoyxa />}
                  {pageValue == 4 && <StartVoyxa />}
                </div>
              </div>
            </div>
          </section>
        }
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
