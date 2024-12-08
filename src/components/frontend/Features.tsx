import React from "react";
import f1b from "/public/f1b.svg";
import f2b from "/public/f2b.svg";
import f3b from "/public/f3b.svg";
import f4b from "/public/f4b.svg";
import f1o from "/public/f1o.svg";
import f2o from "/public/f2o.svg";
import f3o from "/public/f3o.svg";
import f4o from "/public/f4o.svg";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const Features = () => {
  const features = [
    {
      image1: f1b,
      image2: f1o,
      title: "Interative Document Queries",
      brief: "Upload your documents and get accurate answers",
    },
    {
      image1: f2b,
      image2: f2o,
      title: "Scalable Resource Management",
      brief: "Adjust resources based on your needs.",
    },
    {
      image1: f3b,
      image2: f3o,
      title: "Accessible Anywhere",
      brief: "Use through web browsers  anywhere with internet.",
    },
    {
      image1: f3b,
      image2: f3o,
      title: "User-Friendly Interfaces",
      brief: "Easy for non-technical users with intuitive interfaces.",
    },
  ];
  return (
    <div className="">
      <div className="content-container py-16 md:py-24 gap-8 ">
        <div className="md:max-w-[800px] mt-8 text-5xl md:text-6xl font-bold text-left">
          Core Features that Make Converse AI Valuable
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-2 border-black rounded-2xl overflow-hidden divide-x-2 mt-8 divide-black">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-8 hover:bg-black hover:text-accent duration-300 ease-in-out group"
            >
              <div className="w-16 h-16 relative mb-4">
                <Image
                  src={item.image1}
                  alt="icon-image"
                  className="object-contain group-hover:hidden"
                />
                <Image
                  src={item.image2}
                  alt="icon-image-hover"
                  className="object-contain hidden group-hover:block"
                />
              </div>
              <div className="font-bold mb-3 text-lg group-hover:text-white">
                {item.title}
              </div>
              <div className="mb-4 group-hover:text-white">{item.brief}</div>
              <ArrowRight />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
