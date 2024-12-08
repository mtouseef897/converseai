import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero2 = ({ title }: { title: string }) => {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="flex flex-col items-center justify-center gap-6 h-[300px] md:h-[480px]">
        <h1 className="text-black font-bold text-5xl md:text-8xl items-center uppercase">
          {title}
        </h1>
        <p className="flex items-center justify-center gap-2 text-xl text-black">
          <Link href={"/"}>Home</Link>{" "}
          <span>
            <ChevronRightIcon />
          </span>{" "}
          <span className="text-accent capitalize">{title}</span>
        </p>
      </div>
    </div>
  );
};

export default Hero2;
