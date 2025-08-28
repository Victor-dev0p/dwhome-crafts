"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: "Home", link: "/" },
    { label: "About Us", link: "/about" },
    { label: "Contact", link: "/contact" },
    { label: "Projects", link: "/projects" },
    { label: "Blog", link: "/blogs" },
  ];

  return (
    <nav className="sticky top-0 left-0 w-full bg-white md:px-10 px-4 lg:h-[13vh] py-2 flex items-center justify-between z-50 shadow-md">
      {/* Logo */}
      <Image src="/Logo.png" alt="Logo" width={70} height={70} priority />

      {/* Overlay */}
      {mounted && navOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setNavOpen(false)}
        />
      )}

      {/* Nav Drawer */}
      {mounted && (
        <div
          className={`fixed top-0 left-0 h-full 
            w-[40%] sm:w-[40%] md:w-1/4 max-w-sm 
            bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
            flex flex-col items-start pt-24 px-6 gap-6
            ${navOpen ? "translate-x-0 z-40" : "-translate-x-full"}
            lg:static lg:flex-row lg:translate-x-0 lg:w-auto lg:h-auto lg:bg-transparent lg:shadow-none lg:pt-0 lg:px-0 lg:gap-8`}
        >
          {navItems.map((item, index) => {
            const isActive = pathname === item.link;
            return (
              <Link
                key={index}
                href={item.link}
                className={`text-base font-medium whitespace-nowrap gap-5 transition-colors duration-200 ${
                  isActive ? "text-green-700" : "text-gray-800 hover:text-green-700"
                }`}
                onClick={() => setNavOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      {/* Hamburger Button */}
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
