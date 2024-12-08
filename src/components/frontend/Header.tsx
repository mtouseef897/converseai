import { UserButton } from "@clerk/nextjs";
import { CrownIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import AccountButton from "./MyAccount";

const Header = ({ isPremiumUser = false }: { isPremiumUser?: boolean }) => {
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

  return (
    <div className="sticky top-0 w-full bg-white/[0.74] backdrop-blur-md z-50">
      <div className="content-container flex items-center justify-between h-[80px] ">
        <div className="font-bold text-2xl leading-normal tracking-wide">
          Converse Ai
        </div>
        <ul className="flex items-center justify-center gap-6 max-md:hidden">
          {menu.map((item, index) => (
            <li
              key={index}
              className="text-base font-semibold hover:text-accent duration-200 ease-in-out"
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-end gap-2">
          <UserButton afterSignOutUrl="/" />
          {isPremiumUser && (
            <CrownIcon className="ml-2 text-yellow-600 text-base" />
          )}

          <button className="px-8 py-3 bg-black hover:bg-accent duration-200 ease-in-out text-white text-base font-bold rounded-full">
            My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
