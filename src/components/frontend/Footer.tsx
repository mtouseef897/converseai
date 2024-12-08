import { ArrowRight, FastForwardIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Vector from "/public/vector.png";
import Image from "next/image";
import FeedbackForm from "../FeedbackForm";

const Footer = () => {
  const menu = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About us",
      href: "/about",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blogs",
    },
    {
      label: "Faq",
      href: "/faqs",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  const support = [
    {
      label: "Privacy Policy",
      href: "/",
    },
    {
      label: "Terms & Condition",
      href: "/",
    },
  ];

  const contact = [
    {
      label: "+92 12345678",
      href: "/",
    },
    {
      label: "talha@gmail.com",
      href: "/",
    },
  ];

  return (
    <div className="bg-[#f5f5f5]">
      <div className="flex items-center justify-around py-20 bg-[url('/footershape.png')] bg-contain bg-right bg-no-repeat">
        <div className="w-12 h-12 md:w-16 md:h-16 relative">
          <Image
            src={Vector}
            alt="vectorimage"
            fill
            className="object-contain"
          />
        </div>
        <div className="text-5xl md:text-[98px] leading-normal font-bold">
          Converse AI
        </div>
        <div className="w-12 h-12 md:w-16 md:h-16 relative">
          <Image
            src={Vector}
            alt="vectorimage"
            fill
            className="object-contain"
          />
        </div>
        <div className="text-[98px] leading-normal font-bold max-md:hidden">
          Converse AI
        </div>
        <div className="w-16 h-16 relative max-md:hidden">
          <Image
            src={Vector}
            alt="vectorimage"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="content-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t  md:pt-24">
        <div>
          <div className="font-bold text-2xl leading-normal tracking-wide">
            Converse Ai
          </div>
          <p className="text-gray-500 mt-4">
            Our mission is to empower businesses with AI-powered solutions that
            increase productivity, improve decision-making, and drive growth.{" "}
          </p>
        </div>

        <ul className="flex flex-col items-start justify-start gap-2">
          <li className="font-bold ">Quick Links</li>
          {menu.map((item, index) => (
            <li
              key={index}
              className="text-base  hover:text-accent duration-200 ease-in-out"
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col items-start justify-start gap-2">
          <li className="font-bold ">Support</li>
          {support.map((item, index) => (
            <li
              key={index}
              className="text-base  hover:text-accent duration-200 ease-in-out"
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          <li className="font-bold ">Contact</li>
          {contact.map((item, index) => (
            <li
              key={index}
              className="text-base  hover:text-accent duration-200 ease-in-out"
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <div>
          {/* <div className="font-bold ">Subscribe to our newsletter</div> */}
          <div className="font-bold ">Submit your feedback here</div>
          {/* <div className="border-2 border-black rounded-full px-2 py-1 flex items-center justify-between mt-4">
            <input
              type="text"
              className="border-none outline-none"
              placeholder="Enter your email"
            />
            <button className="px-4 py-2 bg-black text-white text-base font-bold rounded-full">
              <ArrowRight />
            </button>
          </div> */}
          <FeedbackForm/>
        </div>
      </div>
      <div className="content-container flex items-center justify-between h-[80px] border-t ">
        <div className="text-base ">
          Converse AI - Designed By{" "}
          <span className="font-bold">Muhammad Talha</span>{" "}
        </div>

        <button className="text-base">
          Copyright © 2024 . All Rights Reserved
        </button>
      </div>
    </div>
  );
};

export default Footer;
