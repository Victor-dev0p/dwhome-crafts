"use client";

import { motion } from "framer-motion";
import HeroImageSlider from "./Slider";
import Link from "next/link";

const Hero = () => {
  // Smooth scroll with navbar offset
  const handleScrollToCollection = (e) => {
    e.preventDefault();
    const target = document.getElementById("featured-collection");
    if (target) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#f8f7f3] min-h-screen flex items-center justify-center px-4 md:px-10">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Text Block */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-[#143c2d] leading-tight">
            Crafting Quality <br /> 
            <span className="text-[#143c2d]">Furniture & Decor</span>
          </h1>
          <p className="text-lg md:text-xl text-[#555]">
            Handmade pieces that elevate your home’s beauty and comfort.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            
            {/* View Collection Button - Slide from left */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="#featured-collection" scroll={false}>
                <button
                  onClick={handleScrollToCollection}
                  className="bg-[#143c2d] text-white px-6 py-2 rounded-md text-sm sm:text-base hover:bg-[#0f2e22] transition duration-300"
                >
                  View Collection
                </button>
              </Link>
            </motion.div>

            {/* Get a Quote Button - Slide from right */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link href="/quote">
                <button className="bg-[#143c2d] text-white px-6 py-2 rounded-md text-sm sm:text-base hover:bg-[#0f2e22] transition duration-300">
                  Get a Quote
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 relative w-full h-[400px] md:h-[500px]">
          <HeroImageSlider />
        </div>
      </div>
    </section>
  );
};

export default Hero;
