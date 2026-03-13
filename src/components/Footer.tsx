"use client";
import { useRef } from "react";
import AnimatedText from "@/components/AnimatedText";
import BaseImage from "@/components/BaseImage";
import Link from "next/link";

const Footer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (<><div id="contact-scroll-anchor" className="h-screen" />
    <footer
      ref={sectionRef}
      className="fixed top-0 right-0 min-h-screen flex flex-col w-full  bg-white border-none mt-[-1px] text-black overflow-hidden z-10 max-h-screen h-screen"
      id="contact"
    >
      {/* <div className="flex flex-col md:flex-row-reverse justify-between  w-full  bg-white z-50 mt-12">
        <AnimatedText text={"Contact"} className="text-6xl md:text-[9vw]" />
        <div className="text-sm md:text-[1.2vw] mt-5 md:mt-0 flex flex-col md:items-start item-start justify-end">
          <AnimatedText text="Don't Follow Your Dream" />
          <AnimatedText text="Follow My Social Media " />
        </div>
      </div> */}
      <div className="mx-auto px-4 xl:px-7 flex-1 flex flex-col h-screen container bg-white text-black z-10 ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 text-lg mt-20 md:text-xl  md:max-h-1/2 md:mt-auto">
          <div className="col-span-2 md:col-span-2 md:order-last order-first flex items-center md:justify-start justify-center flex-col">
            <div className="relative w-1/3 aspect-square">
              <BaseImage
                src="/contract/avatar.jpg"
                alt="Avatar"
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="col-span-1 flex flex-col items-start justify-start">
            <div className="">
              <AnimatedText text="Tan Binh, HCM" />
              <AnimatedText text="+84 0376316144" />
            </div>

            <div className="md:hidden mt-5">
              <AnimatedText text="Email For Work" />
              <AnimatedText text="haminhquan12c7" />
              <AnimatedText text="@gmail.com" />
              <AnimatedText text="Zalo message" className="mt-5" />
              <AnimatedText text="0376316144" />
            </div>
          </div>

          <div className="col-span-1 grid  md:grid-rows-[1fr_1fr_1fr] ">
            <div className="flex flex-col w-fit h-fit">
              <Link
                href="https://github.com/QuanMofii"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AnimatedText text="@Github" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/ha-minh-quan-b10717294/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AnimatedText text="@Linkedin" />
              </Link>
              <Link
                href="https://www.facebook.com/haminhqquan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AnimatedText text="@Facebook" />
              </Link>
              <Link
                href="https://www.instagram.com/QuanMofii"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AnimatedText text="@Instagram" />
              </Link>
            </div>

            <div className="hidden md:block self-center">
              <AnimatedText text="Email For Work" />
              <AnimatedText text="haminhquan12c7@gmail.com" />
            </div>


            <div className="hidden md:block ">
              <AnimatedText text="Zalo message" />
              <AnimatedText text="0376316144" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-8 mt-8 mb-4 overflow-hidden w-full ">
          <div className="col-span-1 md:col-span-2 text-center ">
            <Link
              href="https://github.com/rayquasar18/rayquasar18.github.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AnimatedText
                text="#rayquasar18.github.io/"
                className="text-lg break-words truncate"
              />
            </Link>
          </div>
          <div className="col-span-1 ">
            <AnimatedText text="Built by Quan❤️" className="text-lg" />
          </div>
          <div className="col-span-1 flex md:justify-end">
            <AnimatedText text="©Copyright by QuanMofii" className="text-lg " />
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
