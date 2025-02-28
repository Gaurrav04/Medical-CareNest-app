"use client"

import React, { useState } from "react";
import TransitionalText from "./TransitionalText";
import { BotIcon, Pill, X } from "lucide-react";
import Link from "next/link";
import { CommandMenu } from "../command-menu";
import SearchBar from "./SearchBar";
import { Chat } from "../chat";

const Hero = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const TEXTS = [
    "Ophthalmologists",
    "Cardiologists",
    "Endocrinologists",
    "Dental",
    "Nephrologists",
    "Radiologists",
    "Therapist",
    "Orthopedic surgeons",
  ];

  return (
    <>
      <div className="bg-white dark:bg-slate-950">
        <div className="relative pb-[110px] pt-[50px] dark:bg-dark lg:pt-[50px] max-w-6xl mx-auto">
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 lg:w-6/12">
                <div className="hero-content">
                  <h1 className="mb-5 text-4xl font-bold leading-[1.208] sm:text-[42px] lg:text-[40px] xl:text-5xl flex flex-col">
                    <span className="tracking-tight text-gray-800 dark:text-gray-400">Book your</span>
                    <TransitionalText
                      className="tracking-tight text-blue-600"
                      TEXTS={TEXTS}
                    />
                    <span className="tracking-tight text-gray-600 dark:text-gray-500">
                      sessions now
                    </span>
                  </h1>
                  <p className="mb-8 max-w-[480px] text-base text-body-color text-gray-800 dark:text-gray-400">
                    Healthcare should be straightforward. We&#39;re eliminating the complexity to provide you with simple,
                    affordable, and transparent Healthcare solutions.
                  </p>
                  {/* SEARCH BAR HERE */}
                  {/* <SearchBar /> */}
                      <div className="w-full flex-1 md:flex-none ">
                      <SearchBar/>
                      </div>
                  {/* CTA BUTTONS */}
                  <ul className="flex flex-wrap items-center mt-6">
                    <li>
                      <Link
                        href="/#"
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-center text-base font-medium text-white hover:bg-blue-700 lg:px-7"
                      >
                        Need Doctor Urgently
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/#"
                        className="inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium text-grey-800 hover:text-primary dark:text-white"
                      >
                        <span className="mr-2">
                          <Pill className="flex-shrink-0 h-5 w-5 text-grey-700" />
                        </span>
                        Need a Refill
                      </Link>
                    </li>
                  </ul>
                  <div className="py-4 pt-8 flex gap-4">
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-bold text-blue-600">320</span>
                      <span className="text-sm text-gray-950 dark:text-gray-400">Active Specialists</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-bold text-blue-600">1980</span>
                      <span className="text-sm text-gray-950 dark:text-gray-400">Active Patients</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden px-4 lg:block lg:w-1/12"></div>
              <div className="w-full px-4 lg:w-5/12">
                <div className="lg:ml-auto lg:text-right">
                  <div className="relative z-10 inline-block pt-11 lg:pt-0">
                    <img
                      src="https://cdn.tailgrids.com/1.0/assets/images/hero/hero-image-01.png"
                      alt="hero"
                      className="max-w-full lg:ml-auto"
                    />
                    <span className="absolute -bottom-8 -left-8 z-[-1]">
                      <svg
                        width="93"
                        height="93"
                        viewBox="0 0 93 93"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                        <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                        <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                        <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                        <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                        <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                        <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                        <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                        <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                        <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                        <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                        <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                        <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                        <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                        <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                        <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                        <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                        <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                        <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                        <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                        <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                        <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                        <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                        <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                        <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* Chat Button (Bottom Right) */}
      <div
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all cursor-pointer z-50"
      >
        <BotIcon className="h-6 w-6" />
      </div>

      {/* AI Chat Modal (Always on Top) */}
      <div
        className={`fixed bottom-0 right-0 md:right-6 md:bottom-6 w-[90%] max-w-[400px] bg-white dark:bg-gray-900 p-6 rounded-t-lg md:rounded-lg shadow-lg transition-transform duration-300 ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsChatOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-lg font-bold mb-4 text-center text-blue-600">
          Carenest AI Assistant
        </h2>
        <Chat />
      </div>
    </>
  );
};

export default Hero;

// const SingleImage = ({ href, imgSrc }: { href: string; imgSrc: string }) => {
//   return (
//     <>
//       <a href={href} className="flex w-full items-center justify-center">
//         <img src={imgSrc} alt="brand image" className="h-10 w-full" />
//       </a>
//     </>
//   );
// };
