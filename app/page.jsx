// app/page.jsx
"use client"
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowUp } from "react-icons/fi";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";

const page = () => {
 const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


 const stats = [
    { number: "5+", label: "Years of Excellence" },
    { number: "50+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
  ];

   const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Hero />

      {/* ABOUT SECTION - BRIEF */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              About <span className="text-[#143c2d] ">DWHomes & Crafts</span>
            </h2>
            <div className="w-20 h-1 bg-[#143c2d] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
             At DW HomeCrafts, we blend tradition with elegance to create custom furniture and interior pieces that speak to your lifestyle. 
             From concept to craftsmanship, our designs reflect luxury, comfort, and timeless artistry.
            </p>
            <Link
              href="/about"
              className="inline-block bg-[#143c2d] hover:bg-[#71C0BB] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Learn More About Us
            </Link>
          </motion.div>

          {/* Stats Section */}
          <Stats stats={stats} />
        </div>
      </section>

       {/* Portfolio */}
      <Portfolio />

       {/* Contact CTA Section */}
      <section className="bg-[url('/ads/cta.jpg')] bg-no-repeat bg-center bg-cover bg-fixed min-h-[60]">
        <div className="min-h-[60] bg-black/80 lg:p-20 md:p-10 p-10">
          <div className="space-y-10 max-w-2xl">
            <h2 className="md:text-4xl lg:text-5xl text-2xl font-bold text-white">
              Ready to Build with Us?
            </h2>
            <p className="text-base text-white max-md:text-sm">
             Have a question, custom order, or project in mind? We’d love to hear from you!
            </p>
            <div>
              <Link
                href={"/contact"}
                className="bg-white text-black px-6 py-3 text-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

       {/* TESTIMONIALS */}
      <Testimonials />

        <section className="bg-green-800 text-white py-10 text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="mb-6">Let’s create something beautiful together.</p>
            <button className="bg-white text-green-800 px-6 py-3 rounded-md font-semibold">
              Get a Free Quote
            </button>
        </section>


       {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#143c2d] hover:bg-[#71C0BB] text-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Back to top"
        >
          <FiArrowUp size={24} />
        </button>
      )}
    </>
  );
}

export default page
