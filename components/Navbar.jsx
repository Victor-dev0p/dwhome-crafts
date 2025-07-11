"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", link: "/" },
    { label: "About Us", link: "/about" },
    { label: "Contact ", link: "/contact" },
    { label: "Projects ", link: "/projects" },
    { label: "Blog ", link: "/blog"},
  ];

  return (
<nav className="sticky top-0 left-0 w-full bg-white md:px-10 px-4 lg:h-[13vh] py-2 flex items-center justify-between z-50 shadow-md">
      {/* Logo */}
      <Image
        src="/LG.png"
        alt="Logo"
        width={70}
        height={70}
      />

      <div
        className={`flex items-center gap-5 lg:static lg:flex-row lg:w-auto lg:h-auto lg:bg-transparent max-lg:fixed max-lg:top-0 max-lg:right-0 max-lg:flex-col max-lg:items-center max-lg:pt-24 max-lg:gap-20 max-lg:w-full max-lg:h-full max-lg:bg-white text-gray-800 max-lg:py-10 max-lg:px-6 transition-transform duration-300 ${
          navOpen ? "max-lg:translate-x-0 z-20" : "max-lg:translate-x-full"
        }`}
      >
        {navItems.map((item, index) => {
            const isQuote = item.label.trim() === "Get a Quote";
            const isActive = pathname === item.link && !isQuote;

            return (
                <Link
                    key={index}
                    href={item.link}
                    className={`text-base px-2 transition-colors duration-200 ${
                    isQuote
                    ? "px-3 py-1 border text-gray-800 border-gray-800 hover:bg-green-700 hover:text-white hover:border-green-700"
                    : `text-gray-800 hover:text-green-700 ${isActive ? "text-green-700" : ""}`
                    }`}
                    onClick={() => setNavOpen(false)}
                >
                 {item.label}
                </Link>
             );
        })}
      </div>

      <button
        onClick={() => setNavOpen(!navOpen)}
        className="text-3xl lg:hidden z-50 text-gray-900"
      >
        {navOpen ? <IoCloseOutline /> : <CiMenuFries />}
      </button>
    </nav>
  );
};

export default Navbar;