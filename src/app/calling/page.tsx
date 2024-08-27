"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  PhoneIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  PuzzlePieceIcon,
  BuildingLibraryIcon,
  DevicePhoneMobileIcon,
  BoltIcon,
  PhoneXMarkIcon,
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  XMarkIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import Setting from "../component/setting";
import Dashboard from "../dashboard/page";
import Contact from "../contact/page";
import Phonecell from "../phonecell/page";
import CallSetting from "./callsetting/page";
import CreateVoyxa from "../voyxa/page";

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leftBtnValue, setLeftBtnValue] = useState("DashBoard");

  const leftBtnClick = (name: any) => {
    console.log(name)
    setLeftBtnValue(name);
  };

  const navigation = [
    {
      name: "DashBoard",
      icon: BuildingLibraryIcon,
      current: leftBtnValue === "DashBoard",
    },
    {
      name: "Call Main",
      icon: PhoneIcon,
      current: leftBtnValue === "Call Main",
    },
    {
      name: "Knowledge Base",
      icon: BookOpenIcon,
      current: leftBtnValue === "Knowledge Base",
    },
    {
      name: "Custom Actions",
      icon: WrenchScrewdriverIcon,
      current: leftBtnValue === "Custom Actions",
    },
    {
      name: "Workflows",
      icon: BoltIcon,
      current: leftBtnValue === "Workflows",
    },
    {
      name: "Contacts",
      icon: PhoneXMarkIcon,
      current: leftBtnValue === "Contacts",
    },
    {
      name: "Phone Numbers",
      icon: DevicePhoneMobileIcon,
      current: leftBtnValue === "Phone Numbers",
    },
    {
      name: "Integrations",
      icon: PuzzlePieceIcon,
      current: leftBtnValue === "Integrations",
    },
    {
      name: "Agency",
      icon: SparklesIcon,
      current: leftBtnValue === "Agency",
    },
  ];
  const teams = [
    {
      id: 1,
      name: "Heroicons",
      initial: "H",
      current: leftBtnValue === "Heroicons",
    },
    {
      id: 2,
      name: "Tailwind Labs",
      initial: "T",
      current: leftBtnValue === "Tailwind Labs",
    },
    {
      id: 3,
      name: "Workcation",
      initial: "W",
      current: leftBtnValue === "Workcation",
    },
  ];
  const userNavigation = [
    { name: "Your profile", href: "/" },
    { name: "Sign out", href: "/" },
  ];

  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="h-full">
        <Dialog
          className="relative z-50 lg:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-white transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#f5f5f5] px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center justify-center">
                  <Link href="/">
                    <Image
                      src="/logo.png"
                      alt="Description of image"
                      width={50}
                      height={50}
                      className="mr-3"
                    />
                  </Link>
                  <h2 className="lqd-text-item"> voyxa </h2>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name} className="w-100">
                            <button
                              className={classNames(
                                item.current
                                  ? "text-[#760ad8] bg-[#760ad80f]  border border-[#760ad838]"
                                  : "text-gray-700 hover:bg-white hover:text-[#760ad8] border border-transparent",
                                "group flex gap-x-3 rounded-md p-2 text-[13px] hover:text-[13px] font-semibold leading-6 w-full flex items-center"
                              )}
                              onClick={() => leftBtnClick(item.name)}
                            >
                              <item.icon
                                className={classNames(
                                  item.current
                                    ? "text-[#760ad8]"
                                    : "text-gray-400 group-hover:text-[#760ad8]",
                                  "h-6 w-6 shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-400">
                        Your teams
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <button
                              className={classNames(
                                team.current
                                  ? "bg-gray-50 text-indigo-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                "group flex gap-x-3 rounded-md p-2 text-[13px] hover:text-[13px] font-semibold leading-6 flex items-center"
                              )}
                            >
                              <span
                                className={classNames(
                                  team.current
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border bg-white text-[0.625rem] font-medium"
                                )}
                              >
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="w-100 mt-auto">
                      <button
                        className={classNames(
                          leftBtnValue === "Settings"
                            ? "text-[#760ad8] bg-[#760ad80f]  border border-[#760ad838]"
                            : "text-gray-700 hover:bg-white hover:text-[#760ad8] border border-transparent",
                          "group flex gap-x-3 rounded-md p-2 text-[13px] hover:text-[13px] font-semibold leading-6 w-full flex items-center"
                        )}
                        onClick={() => leftBtnClick("Settings")}
                      >
                        <Cog6ToothIcon
                          className={classNames(
                            leftBtnValue === "Settings"
                              ? "border-indigo-600 text-[#760ad8]"
                              : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                            "h-4 w-4 shrink-0 text-gray-400 group-hover:text-[#760ad8]"
                          )}
                          aria-hidden="true"
                        />
                        Settings
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4 w-[250px]">
            <div className="flex h-16 shrink-0 items-center justify-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Description of image"
                  width={50}
                  height={50}
                  className="mr-3"
                />
              </Link>
              <h2 className="lqd-text-item"> voyxa </h2>

            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name} className="w-100">
                        <button
                          className={classNames(
                            item.current
                              ? "bg-white text-[#760ad8] bg-[#760ad80f]  border border-[#760ad838]"
                              : "text-gray-700 hover:bg-white hover:text-[#760ad8] border border-transparent",
                            "group flex gap-x-3 rounded-md px-2 py-1 font-semibold leading-6 w-full flex items-center text-[13px] hover:text-[13px] "
                          )}
                          onClick={() => leftBtnClick(item.name)}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-[#760ad8]"
                                : "text-gray-400 group-hover:text-[#760ad8]",
                              "h-4 w-4 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Your teams
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <button
                          className={classNames(
                            team.current
                              ? "bg-gray-50 hover:text-[13px]  text-indigo-600"
                              : "text-gray-700 hover:text-[13px]  hover:bg-gray-50 hover:text-indigo-600",
                            "group flex gap-x-3 rounded-md p-2 text-[13px] hover:text-[13px]  font-semibold leading-6 flex items-center"
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? "border-indigo-600 text-indigo-600"
                                : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border bg-white text-[0.625rem] font-medium"
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="w-100 mt-auto">
                  <button
                    className={classNames(
                      leftBtnValue === "Settings"
                        ? "text-[#760ad8] bg-[#760ad80f]  border border-[#760ad838]"
                        : "text-gray-700 hover:bg-white hover:text-[#760ad8] border border-transparent",
                      "group flex gap-x-3 rounded-md p-2 text-[13px] hover:text-[13px] font-semibold leading-6 w-full flex items-center"
                    )}
                    onClick={() => leftBtnClick("Settings")}
                  >
                    <Cog6ToothIcon
                      className={classNames(
                        leftBtnValue === "Settings"
                          ? "border-indigo-600 text-[#760ad8]"
                          : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                        "h-4 w-4 shrink-0 text-gray-400 group-hover:text-[#760ad8]"
                      )}
                      aria-hidden="true"
                    />
                    Settings
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-[250px] h-full">
          <div className="relative">
            <div className="top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 absolute w-full">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Separator */}
              <div
                className="h-6 w-px bg-gray-200 lg:hidden"
                aria-hidden="true"
              />

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form className="relative flex flex-1" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    id="search-field"
                    className="bg-white block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm focus-visible:outline-none"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </form>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Separator */}
                  <div
                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                    aria-hidden="true"
                  />

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        src="/logo.png"
                        alt="Description of image"
                        width={50}
                        height={50}
                        className="h-8 w-8 rounded-full bg-gray-50"
                      />

                      <span className="hidden lg:flex lg:items-center">
                        <span
                          className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                          aria-hidden="true"
                        >
                          Dmytro
                        </span>
                        <ChevronDownIcon
                          className="ml-2 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </MenuButton>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {({ focus }) => (
                            <Link href={item.href}>
                              <button
                                className={classNames(
                                  focus ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                                )}
                              >
                                {item.name}
                              </button>
                            </Link>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <main className="h-full bg-[#f9fafb]">
            <div className="flex justify-center h-full pt-[64px] items-center">
              {leftBtnValue === "Settings" && <Setting />}
              {leftBtnValue === "Contacts" && <Contact />}
              {leftBtnValue === "Phone Numbers" && <Phonecell />}
              {leftBtnValue === "Call Main" && <CallSetting />}
              {leftBtnValue === "DashBoard" && <Dashboard />}
              {leftBtnValue === "Integrations" && <CreateVoyxa />}
              
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
