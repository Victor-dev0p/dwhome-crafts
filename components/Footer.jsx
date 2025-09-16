import Link from "next/link";
import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const quickLinks = [
    { text: "Home", url: "/" },
    { text: "About Us", url: "/about" },
    { text: "Projects", url: "/projects" },
    { text: "Services", url: "/services" },
    { text: "Blog", url: "/blogs" },
    { text: "Contact", url: "/contact" },
    { text: "Admin", url: "/admin" },
  ];

  const socialLinks = [
    {
      icon: FaFacebookF,
      url: "https://facebook.com/dwhomecrafts",
      label: "Facebook",
      color: "hover:text-blue-600"
    },
    {
      icon: FaInstagram,
      url: "https://instagram.com/drwoods_interiors",
      label: "Instagram",
      color: "hover:text-pink-500"
    },
    {
      icon: FaXTwitter,
      url: "https://twitter.com/DrWoods06",
      label: "Twitter",
      color: "hover:text-#000000"
    },
    {
      icon: FaLinkedinIn,
      url: "https://linkedin.com/company/dwhomecrafts",
      label: "LinkedIn",
      color: "hover:text-blue-700"
    },
    {
      icon: FaWhatsapp,
      url: "https://wa.me/2347058749114",
      label: "WhatsApp",
      color: "hover:text-green-500"
    },
  ];

  return (
    <footer className="bg-[#f8f7f3] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                DW Home & Crafts
              </h3>
              <p className="text-gray-800 leading-relaxed max-w-md">
                Professional construction and renovation services in Abuja. 
                Building dreams, delivering excellence with over a decade of experience 
                in quality craftsmanship.
              </p>
            </div>
            
            {/* Social Media Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-gray-700 rounded-full transition-all duration-300 ${social.color} hover:bg-gray-600 hover:scale-110 transform`}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-800">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.url}
                    className="text-gray-800 hover:text-[#143c2d] transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gray-700 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-gray-800">Contact Info</h4>
            <div className="space-y-4">
              <Link
                href="tel:+2347058749114"
                className="flex items-center space-x-3 group hover:text-[#143c2d] transition-all duration-300"
              >
                <div className="p-2 bg-gray-700 rounded-lg group-hover:bg-[#143c2d] transition-colors">
                  <FaPhone className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-600">+234 (0) 705 874 9114</span>
              </Link>
              
              <Link
                href="mailto:dwhomecrafts@gmail.com"
                className="flex items-center space-x-3 group hover:text-[#143c2d] transition-all duration-300"
              >
                <div className="p-2 bg-gray-700 rounded-lg group-hover:bg-[#143c2d] transition-colors">
                  <FaEnvelope className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-800">dwhomecrafts@gmail.com</span>
              </Link>
              
              <div className="flex items-start space-x-3 group">
                <div className="p-2 bg-gray-700 rounded-lg mt-1">
                  <FaMapMarkerAlt className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-800 leading-relaxed">
                  34 Crescent, 3rd Avenue,<br />
                  Gwarinpa, Abuja, Nigeria
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h4 className="text-xl font-semibold text-green-400">
              Stay Updated with Our Latest Projects
            </h4>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get insights into our latest construction projects, home improvement tips, 
              and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-green-400 focus:outline-none transition-colors"
              />
              <button className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} DW Home & Crafts. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-green-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/blogs" className="text-gray-400 hover:text-green-400 transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;