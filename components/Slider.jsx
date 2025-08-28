import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const heroImages = [
  "/Her01.jpg",
  "/Hero2.jpg",
  "/Hero3.jpg", // Add as many as you want
];

const HeroImageSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change image every 4s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={heroImages[current]}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1  }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <Image
            src={heroImages[current]}
            alt={`Hero Slide ${current + 1}`}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroImageSlider;