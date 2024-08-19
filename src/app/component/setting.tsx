"use client";

import { useState } from "react";
import Video from "./settings/video";
import Audio from "./settings/audio";
import General from "./settings/general";
import Caption from "./settings/caption";
import Account from "./settings/account";
import Billing from "./settings/billing";

const Setting = () => {
  const [tabValue, setTabValue] = useState("Account");

  const tabs = [
    { name: "Account", current: tabValue === "Account" },
    { name: "Audio", current: tabValue === "Audio" },
    { name: "Video", current: tabValue === "Video" },
    { name: "General", current: tabValue === "General" },
    { name: "Captions", current: tabValue === "Captions" },
    { name: "Billing", current: tabValue === "Billing" },
  ];

  const clickTabButton = (name: string) => {
    setTabValue(name);
  };

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="w-[85%] mt-[100px] h-full">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="py-[10px] px-[20px] block w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabValue}
          onChange={(e) => {
            clickTabButton(e.target.value);
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIndex) => (
            <button
              key={tab.name}
              className={classNames(
                tab.current
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIndex === 0 && "rounded-l-lg",
                tabIndex === tabs.length - 1 && "rounded-r-lg",
                "group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10 border border-[#3d179829]"
              )}
              aria-current={tab.current ? "page" : undefined}
              onClick={() => clickTabButton(tab.name)}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? "bg-indigo-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </button>
          ))}
        </nav>
      </div>
      <div className="flex justify-center">
        {tabValue === "Account" && <Account />}
        {tabValue === "Video" && <Video />}
        {tabValue === "Audio" && <Audio />}
        {tabValue === "Captions" && <Caption />}
        {tabValue === "General" && <General />}
        {tabValue === "Billing" && <Billing />}
      </div>
    </div>
  );
};

export default Setting;
