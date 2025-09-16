"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { MdFormatQuote } from "react-icons/md";
import Statts from "@/components/Statts";

/** ---- Hardcoded testimonials (fixed image paths) ---- */
const hardcodedTestimonials = [
  {
    name: "Michael Akeja",
    text: "Dwhome & Crafts transformed our home beyond our wildest dreams...",
    location: "Abuja Resident",
    project: "Complete Home Renovation",
    rating: 5,
    image: "/reviews/tee.jpg",
  },
  {
    name: "Alhaji Mohiz",
    text: "Their work on every space in my complex was remarkable...",
    location: "Commercial Client",
    project: "Office Complex Furnishing",
    rating: 5,
    image: "/reviews/mohiz.jpg",
  },
  {
    name: "Chief Oseni",
    text: "From concept to completion, Dwhome & Crafts delivered excellence...",
    location: "Edo State",
    project: "Luxury Estate Design",
    rating: 5,
    image: "/reviews/c.oseni.jpg",
  },
  {
    name: "Alhaja. Jasmine Jatau",
    text: "Working with this team was a pleasure from start to finish...",
    location: "Kogi State",
    project: "Shopping Complex Construction",
    rating: 5,
    image: "/reviews/alhaja.jpg",
  },
  {
    name: "Dr. Grace Agu",
    text: "Every piece of furnishing speaks comforts and care for health...",
    location: "Abia State",
    project: "Medical Facility Furnishing",
    rating: 5,
    image: "/reviews/hilo.jpg",
  },
  {
    name: "Architect Oluwaseun",
    text: "As an architectural design expert, I was impressed by their technical expertise and attention to details...",
    location: "Delta State",
    project: "House of Assembly",
    rating: 5,
    image: "/reviews/seun.jpg",
  },
  {
    name: "Chef Eucharia Ukhabi",
    text: "Their ability to bring architectural visions to life is remarkable...",
    location: "Edo State",
    project: "Lounge Walk in Kitchen",
    rating: 5,
    image: "/reviews/chef.jpg",
  },
  {
    name: "Mr. Dantata Sani",
    text: "Dwhome & Crafts doesn't just furnish spaces; they tell stories with art...",
    location: "Kano State",
    project: "Luxury Hotel Design",
    rating: 5,
    image: "/reviews/ikh.jpg",
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
    const gapPx = parseInt(styles.columnGap || styles.gap || "24", 10) || 24;

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

      // Handle infinite scroll effect
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        // recompute after scroll
        const card = el.querySelector("[data-card]");
        const cw = card?.offsetWidth || 360;
        const styles = window.getComputedStyle(el);
        const gap = parseInt(styles.columnGap || styles.gap || "24", 10) || 24;

        const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - (cw + gap);
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

  // Pause/resume handlers
  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  // Admin handlers
  const handleEdit = (t) => console.log("Edit:", t);
  
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((x) => x._id !== id));
      } else {
        console.error("Delete request failed");
      }
    } catch (e) {
      console.error("Delete failed:", e);
    }
  };

  // Helper function to get correct image source
  const getImageSrc = (image) => {
    if (!image) return "/reviews/default-avatar.jpg"; // fallback image
    
    // External URL (http/https) or base64 data
    if (image.startsWith("http") || image.startsWith("data:image")) {
      return image;
    }
    
    // Local file path
    if (image.startsWith("/")) {
      return image; // Already has leading slash
    }
    
    // Base64 data without data: prefix
    if (image.length > 100 && !image.includes("/") && !image.includes(".")) {
      return `data:image/jpeg;base64,${image}`;
    }
    
    // Relative path - add leading slash
    return `/${image}`;
  };

  // Render star rating
  const renderStars = (rating = 5) =>
    Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        size={16}
        className={i < rating ? "text-[#143c2d] fill-current" : "text-gray-300"}
      />
    ));

  const testimonialStats = [
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
            have to say about their experience working with Dwhome & Crafts.
          </p>
        </motion.div>

        {/* Navigation Controls */}
        <div
          className="flex justify-center gap-3 mb-4"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          <button
            aria-label="Previous testimonial"
            onClick={() => stepScroll(-1)}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#143c2d] hover:text-white hover:border-[#143c2d] transition-all duration-300"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => stepScroll(1)}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#143c2d] hover:text-white hover:border-[#143c2d] transition-all duration-300"
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Carousel Container */}
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
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={`${testimonial.name}-${idx}`}
                data-card
                className="
                  flex-shrink-0 scroll-snap-align-start
                  w-[88vw] sm:w-[60vw] md:w-[45vw] lg:w-[32%] xl:w-[30%]
                  min-w-[280px] max-w-[420px]
                  bg-gray-800 rounded-2xl p-8 shadow-lg relative
                  hover:shadow-xl transition-shadow duration-300
                "
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-green-800/20">
                  <MdFormatQuote size={48} />
                </div>

                {/* Client Info */}
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img
                      src={getImageSrc(testimonial.image)}
                      alt={`${testimonial.name} testimonial`}
                      className="w-16 h-16 rounded-full object-cover border-3 border-green-800 mr-4"
                      onError={(e) => {
                        e.target.src = "/reviews/default-avatar.jpg"; // Fallback on error
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                    <p className="text-green-600 text-xs font-medium">{testimonial.project}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-200 text-base leading-relaxed italic relative z-10">
                  "{testimonial.text}"
                </blockquote>

                {/* Admin Controls */}
                {isAdmin && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="text-sm text-yellow-400 underline hover:text-yellow-300 transition-colors"
                    >
                      Edit
                    </button>
                    {testimonial._id && (
                      <button
                        onClick={() => handleDelete(testimonial._id)}
                        className="text-sm text-red-500 underline hover:text-red-400 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Gradient fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/90 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/90 to-transparent" />
        </div>

        {/* Statistics Section */}
        <Statts
          statts={testimonialStats}
          containerClass="bg-[#143c2d] mt-16"
          numberClass="text-3xl md:text-4xl text-white"
          labelClass="text-sm md:text-base text-[#71C0BB]"
        />
      </div>
    </section>
  );
};

export default Testimonials;