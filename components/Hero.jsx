"use client";

// import Image from "next/image";
import HeroImageSlider from "./Slider";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-[#f8f7f3] min-h-screen flex items-center justify-center px-4 md:px-10">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Text Block */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-[#143c2d] leading-tight">
            Crafting Quality <br /> <span className="text-[#143c2d]">Furniture & Decor</span>
          </h1>
          <p className="text-lg md:text-xl text-[#555]">
            Handmade pieces that elevate your home’s beauty and comfort.
          </p>
          <p className="flex gap-4">
            <Link href="#featured-collection" scroll={true}>
              <button  
                onClick={() => {
                  const h3 = document.getElementById("featured-collection");
                  if (h3) {
                    const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
                    const h3Top =
                      h3.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    window.scrollTo({
                      top: h3Top,
                      behavior: "smooth",
                    });
                  }
                }}
              className="bg-[#143c2d] text-white px-8 py-3 rounded-md hover:bg-[#0f2e22] transition duration-300">
                View Collection
              </button>
            </Link>
            <Link href="/quote">
              <button className="bg-[#143c2d] text-white px-8 py-3 rounded-md hover:bg-[#0f2e22] transition duration-300">
               Get a Quote
              </button>
            </Link>
          </p>
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
