'use client';
import { motion } from 'framer-motion';

const AboutHero = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center text-white bg-black">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')" // Replace with your actual image path
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Crafting Spaces That Feel Like Home
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#C2FFC7] mb-8">
          At DW Home Crafts, we blend style, comfort, and craftsmanship to build interiors that speak your language.
        </p>

        <a
          href="#our-story"
          className="inline-block bg-white text-[#143c2d] font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#71C0BB] hover:text-white transition duration-300"
        >
          Learn Our Story
        </a>
      </motion.div>
    </section>
  );
};

export default AboutHero;
