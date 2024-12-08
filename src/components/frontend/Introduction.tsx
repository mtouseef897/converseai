import Image from "next/image";
import React from "react";
import introimage from "/public/intro.jpg";

const Introduction = () => {
  return (
    <div className="pb-8 md:pb-16">
      <div className="content-container flex items-center justify-center max-md:flex-col bg-black rounded-3xl gap-8 md:gap-16 ">
        <div className="relative  w-full">
          <Image src={introimage} alt="scope-image"  className="object-cover"/>
        </div>
        <div className="py-16 md:py-24">
          <div className=" mt-8 text-5xl md:text-7xl font-bold text-left text-white">
            Your Intelligent Document Assistant
          </div>
          <p className="text-white mt-4  md:max-w-[541px]">
            Converse AI revolutionizes document interaction by seamlessly
            integrating artificial intelligence into your workflow. With our
            intuitive AI SaaS platform, users can effortlessly upload documents
            and engage in natural language conversations to extract valuable
            insights and information.
          </p>
          <div className="flex items-center justify-between gap-4 max-md:flex-col mt-8">
            <div>
              <span className="text-accent text-8xl block">92%</span>
              <span className="text-white text-base block">
                Customer service inquiries
              </span>
            </div>
            <div>
              <span className="text-accent text-8xl block">75%</span>
              <span className="text-white text-base block">
                Using financial institutions
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
