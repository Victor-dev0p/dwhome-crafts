import Link from "next/link";
import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const quickLnks = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "About Us",
      url: "/about",
    },
    {
      text: "Projects",
      url: "/projects",
    },
    {
      text: "Contact",
      url: "/contact",
    },
    {
      text: "Admin",
      url: "/admin",
    },
  ];
  return (
    <main className="bg-[#f8f7f3] text-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-900 max-md:text-center">
              DW Home&Crafts
            </h3>
            <p className="text-gray-800 max-md:text-center">
              Professional construction and renovation services in Abuja.
              Building dreams, delivering excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-center">Quick Links</h4>
            <ul className="space-y-2 flex flex-col items-center justify-center">
              {quickLnks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    className="text-gray-800 hover:text-green-500 transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold max-md:text-center">
              Contact Us
            </h4>
            <div className="space-y-3 max-md:flex flex-col items-center justify-center">
              <Link
                href={"tel:07058749114"}
                className="flex items-center space-x-3 group w-fit"
              >
                <FaPhone className="text-green-800" />
                <span className="text-gray-600 group-hover:text-[#143c2d] transition-all">
                  +234(0) 705 874 9114
                </span>
              </Link>
              <Link
                href={"mailto:dwhomecrafts@gmail.com"}
                className="flex items-center gap-3 group w-fit"
              >
                <FaEnvelope className="text-green-800" />
                <span className="text-gray-600 group-hover:text-[#143c2d] transition-all">
                  dwhomecraft@gmail.com
                </span>
              </Link>
              <div className="flex items-center space-x-3 group w-fit">
                <FaMapMarkerAlt className="text-green-800 text-xl" />
                <span className="text-gray-600 group-hover:text-[#143c2d] transition-all text-center">
                  34 Crescent, 3rd Avenue, Gwarinpa, Abuja.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left max-md:text-sm">
              &copy; {new Date().getFullYear()} DWHome & Crafts. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Footer;