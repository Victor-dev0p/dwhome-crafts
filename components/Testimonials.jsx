"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { MdFormatQuote } from "react-icons/md";
import Statts from "@/components/Statts";

/** ---- Hardcoded testimonials (exactly your 8) ---- */
const hardcodedTestimonials = [
  {
    name: "John Davidson",
    text: "Brooklyn & Bronx transformed our home beyond our wildest dreams...",
    location: "Abuja Resident",
    project: "Complete Home Renovation",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Sarah Martinez",
    text: "The renovation work was absolutely incredible...",
    location: "Commercial Client",
    project: "Office Complex Renovation",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Chief Adebayo Ogundimu",
    text: "From concept to completion, Brooklyn & Bronx delivered excellence...",
    location: "Lagos State",
    project: "Luxury Estate Development",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Mrs. Fatima Ibrahim",
    text: "Working with this team was a pleasure from start to finish...",
    location: "Kano State",
    project: "Shopping Complex Construction",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Dr. Michael Okafor",
    text:
      "The structural integrity and architectural beauty of our medical facility...",
    location: "Enugu State",
    project: "Medical Facility Construction",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Engineer Blessing Okoro",
    text:
      "As a fellow engineer, I was impressed by their technical expertise...",
    location: "Rivers State",
    project: "Infrastructure Development",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Architect Kemi Adeleke",
    text:
      "Their ability to bring architectural visions to life is remarkable...",
    location: "Oyo State",
    project: "Residential Complex",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Mr. Ahmed Bello",
    text:
      "Brooklyn & Bronx doesn't just build structures; they build dreams...",
    location: "Kaduna State",
    project: "Luxury Hotel Construction",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
];

const Testimonials = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.isAdmin;

  const [testimonials, setTestimonials] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const carouselRef = useRef(null);
  const timerRef = useRef(null);

  // Merge DB testimonials with hardcoded
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const dbTestimonials = await res.json();
        setTestimonials([...(dbTestimonials || []).reverse(), ...hardcodedTestimonials]);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
        setTestimonials(hardcodedTestimonials);
      }
    };
    fetchTestimonials();
  }, []);

  // Helper to compute one-card scroll amount (card width + gap)
  const computeStep = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return 360; // fallback

    const firstCard = el.querySelector("[data-card]");
    const cardWidth = firstCard?.offsetWidth || 360;

    const styles = window.getComputedStyle(el);
    const gapPx =
      parseInt(styles.columnGap || styles.gap || "24", 10) || 24;

    return cardWidth + gapPx;
  }, []);

  // Programmatic step (dir: 1 forward, -1 back)
  const stepScroll = useCallback(
    (dir = 1) => {
      const el = carouselRef.current;
      if (!el) return;

      const amount = computeStep() * dir;
      const nextLeft = el.scrollLeft + amount;

      // Smooth one-card slide
      el.scrollTo({ left: nextLeft, behavior: "smooth" });

      // If we've reached (or nearly) the end when going forward, jump back instantly
      // after the smooth scroll finishes (approx 500–700ms).
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        // recompute after scroll
        const card = el.querySelector("[data-card]");
        const cw = card?.offsetWidth || 360;
        const styles = window.getComputedStyle(el);
        const gap =
          parseInt(styles.columnGap || styles.gap || "24", 10) || 24;

        const nearEnd =
          el.scrollLeft + el.clientWidth >= el.scrollWidth - (cw + gap);

        const nearStart = el.scrollLeft <= 0 + 1; // tolerance

        if (dir > 0 && nearEnd) {
          const prev = el.style.scrollBehavior;
          el.style.scrollBehavior = "auto";
          el.scrollTo({ left: 0 });
          el.style.scrollBehavior = prev;
        } else if (dir < 0 && nearStart) {
          // snap to end when stepping backwards at the beginning
          const prev = el.style.scrollBehavior;
          el.style.scrollBehavior = "auto";
          el.scrollTo({ left: el.scrollWidth });
          el.style.scrollBehavior = prev;
        }
      }, 650);
    },
    [computeStep]
  );

  // Autoplay (pause on hover)
  useEffect(() => {
    if (!carouselRef.current || testimonials.length === 0) return;

    if (!isPaused) {
      const id = window.setInterval(() => stepScroll(1), 4000);
      return () => window.clearInterval(id);
    }
  }, [isPaused, testimonials.length, stepScroll]);

  // Pause on any user interaction (hover, buttons, touch)
  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  const handleEdit = (t) => console.log("Edit:", t);
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) setTestimonials((prev) => prev.filter((x) => x._id !== id));
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  const renderStars = (rating = 5) =>
    Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        size={16}
        className={i < rating ? "text-[#143c2d] fill-current" : "text-gray-300"}
      />
    ));

  const testimonialStatts = [
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Happy Clients" },
    { number: "100%", label: "Project Completion" },
    { number: "8+", label: "Years Excellence" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our <span className="text-green-800">Clients Say</span>
          </h2>
          <div className="w-20 h-1 bg-[#143c2d] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients across Nigeria
            have to say about their experience working with Brooklyn & Bronx.
          </p>
        </motion.div>

        {/* Top-right controls */}
        <div
          className="flex justify-center gap-3 mb-4"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <button
            aria-label="Previous"
            onClick={() => stepScroll(-1)}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#143c2d] hover:text-white transition"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            aria-label="Next"
            onClick={() => stepScroll(1)}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#143c2d] hover:text-white transition"
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onTouchStart={pause}
            onTouchEnd={resume}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                data-card
                className="
                  flex-shrink-0 scroll-snap-align-start
                  w-[88vw] sm:w-[60vw] md:w-[45vw] lg:w-[32%] xl:w-[30%]
                  min-w-[280px] max-w-[420px]
                  bg-gray-800 rounded-2xl p-8 shadow-lg relative
                "
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-6 right-6 text-green-800/20">
                  <MdFormatQuote size={48} />
                </div>

                <div className="flex items-center mb-6">
                  <img
                    src={
                      t.image?.startsWith("http") || t.image?.startsWith("data:image")
                        ? t.image
                        : `data:image/jpeg;base64,${t.image}`
                    }
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-green-800 mr-4"
                  />
                  <div>
                    <h4 className="text-white font-bold text-lg">{t.name}</h4>
                    <p className="text-gray-400 text-sm">{t.location}</p>
                    <p className="text-green-600 text-xs font-medium">{t.project}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {renderStars(t.rating)}
                </div>

                <blockquote className="text-gray-200 text-base leading-relaxed italic relative z-10">
                  "{t.text}"
                </blockquote>

                {isAdmin && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(t)}
                      className="text-sm text-yellow-400 underline hover:text-yellow-300"
                    >
                      Edit
                    </button>
                    {t._id && (
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-sm text-red-500 underline hover:text-red-400"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* soft edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/90 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/90 to-transparent" />
        </div>

        {/* Statistics (unchanged) */}
        <Statts
          statts={testimonialStatts}
          containerClass="bg-[#143c2d] mt-16"
          numberClass="text-3xl md:text-4xl text-white"
          labelClass="text-sm md:text-base text-[#71C0BB]"
        />
      </div>
    </section>
  );
};

export default Testimonials;
