import Image from "next/image";
import React from "react";
import missionimage from "/public/mission.jpg";

const Mission = () => {
  return (
    <div className="">
      <div className="content-container flex items-center justify-center max-md:flex-col py-16 md:py-24 gap-8 md:gap-16 ">
        <div>
          <div className="md:max-w-[600px] mt-8 text-5xl md:text-7xl font-bold text-left">
            Our Mission
          </div>
          <p className="text-gray-600 mt-4  md:max-w-[541px]">
            Our mission is to empower businesses with AI-powered solutions that
            increase productivity, improve decision-making, and drive growth.
            Since 2024, we have been passionate about helping our clients
            harness the full potential of their documents and data, keeping them
            competitive in an increasingly digital world.
          </p>
          <div className="md:max-w-[600px] mt-8 text-4xl md:text-5xl font-bold text-left">
            Unlock the Power of Your Documents
          </div>
          <p className="text-gray-600 mt-4  md:max-w-[541px]">
            Converse Ai allows you to upload documents and interact with them
            seamlessly. Ask questions and receive accurate answers derived
            directly from your files, ensuring you get the most out of your
            information.
          </p>
        </div>
        <div>
          <Image src={missionimage} alt="scope-image" />
        </div>
      </div>
    </div>
  );
};

export default Mission;
