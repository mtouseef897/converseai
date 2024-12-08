import { UserButton } from "@clerk/nextjs";
import { ArrowRight, CrownIcon, LogIn } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import FileUpload from "../ui/fileUpload";

const Hero = ({
  isPremiumUser,
  isAuth,
  firstChat,
}: {
  isPremiumUser: boolean;
  isAuth: boolean;
  firstChat: any;
}) => {
  return (
    <div>
      <div className=" flex flex-col items-center justify-center text-center gap-12 py-24 bg-[url('/heroshape.png')]  bg-right bg-no-repeat">
        <div className="">
          <div className="font-bold text-4xl md:text-xl lg:text-7xl leading-0 tracking-[-2px] max-w-[1200px]">
            Unlock the Power of Your Documents with Converse AI
          </div>
          <p className="text-gray-700  max-w-[900px] mx-auto mt-8">
            Converse AI, transforms the way you interact with your documents.
            Upload your PDFs, Word, PPT ask questions, and receive accurate
            answers directly from the content of your documents.
          </p>
        </div>
        <div>
          {isAuth && firstChat && (
            <div className="flex items-center justify-center gap-8 max-md:flex-col">
              <a href={`/chat/${firstChat.id}`}>
                <button className="px-8 py-5 bg-black hover:bg-accent duration-200 ease-in-out text-white text-sm font-bold rounded-full">
                  Go to Chats
                </button>
              </a>
              <a href={`/`}>
                <button className="px-8 py-5 bg-white border-2 border-black hover:border-accent hover:text-accent duration-200 ease-in-out  text-sm font-bold rounded-full">
                  Manage Subscriptions
                </button>
              </a>
            </div>
          )}
        </div>

        {!isAuth && (
          <a href="sign-in">
            <button className="px-8 py-5 bg-black hover:bg-accent duration-200 ease-in-out text-white text-sm font-bold rounded-full">
              Get started for free
            </button>
          </a>
        )}
        <div className="content-container mt-4 text-center">
          {isAuth && <FileUpload isPro={isPremiumUser} />}
        </div>
      </div>

    </div>
  );
};

export default Hero;
