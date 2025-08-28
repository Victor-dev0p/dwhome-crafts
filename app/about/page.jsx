"use client";
import React from "react";
import { FaCouch, FaHandsHelping, FaAward } from "react-icons/fa";
import AboutHero from "@/components/AboutHero";
import Slider from "react-slick"; // simple slider library
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutPage = () => {
  const sliderImages = [
    "/Nproj/workshop1.jpg",
    "/Nproj/workshop2.jpg",
    "/Nproj/team1.jpg",
    "/Nproj/furniture1.jpg",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  return (
    <main className="min-h-dvh bg-gray-200">
      <AboutHero />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Crafting Comfort, Creating Spaces
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At DW Home Crafts, we merge tradition with innovation to design bespoke furniture and interiors that elevate everyday living.
          </p>
        </header>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <FaCouch className="mx-auto text-5xl text-green-700 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Our Craft</h2>
            <p className="text-gray-600">
              From timeless furniture pieces to modern interiors, our artisans blend style and durability to bring every idea to life.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <FaHandsHelping className="mx-auto text-5xl text-green-700 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Our Promise</h2>
            <p className="text-gray-600">
              We prioritize your vision, working closely with clients to ensure every project feels personal, functional, and refined.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <FaAward className="mx-auto text-5xl text-green-700 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Our Standard</h2>
            <p className="text-gray-600">
              We hold ourselves to the highest standards of quality, sustainability, and customer satisfaction—earning trust with every build.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <section id="our-story" className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <div className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed">
            <p className="mb-4">
              DW Home Crafts was born from a deep passion for furniture making and interior transformation. What started as a small workshop in Abuja has grown into a full-fledged brand known for elegance, durability, and authenticity.
            </p>
            <p>
              We believe your home should be a reflection of who you are. That’s why we design, build, and deliver personalized solutions that suit your taste, lifestyle, and story. Whether it’s a minimalist coffee table or a full living room redesign, we pour heart and skill into every detail.
            </p>
          </div>
        </section>

        {/* Behind the Craft Slider */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Behind the Craft
          </h2>
          <div className="max-w-4xl mx-auto">
            <Slider {...sliderSettings}>
              {sliderImages.map((src, index) => (
                <div key={index} className="px-2">
                  <img
                    src={src}
                    alt={`Slide ${index}`}
                    className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
