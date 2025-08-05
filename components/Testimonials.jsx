"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { MdFormatQuote } from "react-icons/md";

const Testimonials = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.isAdmin;

  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const dbTestimonials = await res.json();

        const hardcodedTestimonials = [
          {
            name: "John Davidson",
            text: "Brooklyn & Bronx transformed our home beyond our wildest dreams...",
            location: "Abuja Resident",
            project: "Complete Home Renovation",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
          },
          {
            name: "Sarah Martinez",
            text: "The renovation work was absolutely incredible...",
            location: "Commercial Client",
            project: "Office Complex Renovation",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
          },
          {
            name: "Chief Adebayo Ogundimu",
            text: "From concept to completion, Brooklyn & Bronx delivered excellence...",
            location: "Lagos State",
            project: "Luxury Estate Development",
            rating: 5,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          },
          {
            name: "Mrs. Fatima Ibrahim",
            text: "Working with this team was a pleasure from start to finish...",
            location: "Kano State",
            project: "Shopping Complex Construction",
            rating: 5,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
          },
          {
            name: "Dr. Michael Okafor",
            text: "The structural integrity and architectural beauty of our medical facility...",
            location: "Enugu State",
            project: "Medical Facility Construction",
            rating: 5,
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
          },
          {
            name: "Engineer Blessing Okoro",
            text: "As a fellow engineer, I was impressed by their technical expertise...",
            location: "Rivers State",
            project: "Infrastructure Development",
            rating: 5,
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
          },
          {
            name: "Architect Kemi Adeleke",
            text: "Their ability to bring architectural visions to life is remarkable...",
            location: "Oyo State",
            project: "Residential Complex",
            rating: 5,
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
          },
          {
            name: "Mr. Ahmed Bello",
            text: "Brooklyn & Bronx doesn't just build structures; they build dreams...",
            location: "Kaduna State",
            project: "Luxury Hotel Construction",
            rating: 5,
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
          }
        ];

        setTestimonials([...dbTestimonials.reverse(), ...hardcodedTestimonials]);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
        setTestimonials([...hardcodedTestimonials]); // fallback
      }
    };

    fetchTestimonials();
  }, []);

  const scrollLeft = () => {
    const cardWidth = 384 + 32;
    scrollContainerRef.current?.scrollBy({ left: -cardWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    const cardWidth = 384 + 32;
    scrollContainerRef.current?.scrollBy({ left: cardWidth, behavior: "smooth" });
  };

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    scrollContainer.addEventListener("scroll", checkScrollButtons);
    checkScrollButtons();
    return () => scrollContainer.removeEventListener("scroll", checkScrollButtons);
  }, []);

  const handleEdit = (testimonial) => {
    // TODO: Add modal or redirect to edit page
    console.log("Edit:", testimonial);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTestimonials(prev => prev.filter(t => t._id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        size={16}
        className={`${index < rating ? "text-[#143c2d] fill-current" : "text-gray-300"}`}
      />
    ));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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

        {/* Scroll Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`p-3 rounded-full border-2 transition-all duration-300 ${
              canScrollLeft
                ? "border-green-800 text-green-800 hover:bg-[#143c2d] hover:text-white"
                : "border-gray-300 text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Scroll left"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`p-3 rounded-full border-2 transition-all duration-300 ${
              canScrollRight
                ? "border-green-800 text-green-800 hover:bg-green-800 hover:text-white"
                : "border-gray-300 text-gray-300 cursor-not-allowed"
            }`}
            aria-label="Scroll right"
          >
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-96 bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
              >
                <div className="absolute top-6 right-6 text-green-800/20 group-hover:text-green-800/30 transition-colors duration-300">
                  <MdFormatQuote size={48} />
                </div>
                <div className="flex items-center mb-6">
                  <img
                    src={
                      testimonial.image?.startsWith("http") || testimonial.image?.startsWith("data:image")
                        ? testimonial.image
                        : `data:image/jpeg;base64,${testimonial.image}`
                    }
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-green-800 mr-4"
                  />
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                    <p className="text-green-600 text-xs font-medium">{testimonial.project}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-4">{renderStars(testimonial.rating)}</div>
                <blockquote className="text-gray-200 text-base leading-relaxed italic relative z-10">
                  "{testimonial.text}"
                </blockquote>
                {isAdmin && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="text-sm text-yellow-400 underline hover:text-yellow-300"
                    >
                      Edit
                    </button>
                    {testimonial._id && (
                      <button
                        onClick={() => handleDelete(testimonial._id)}
                        className="text-sm text-red-500 underline hover:text-red-400"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/90 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/90 to-transparent pointer-events-none z-10" />
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-[#143c2d] rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-sm md:text-base text-[#71C0BB]">Client Satisfaction</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base text-[#71C0BB]">Happy Clients</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <div className="text-sm md:text-base text-[#71C0BB]">Project Completion</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">8+</div>
              <div className="text-sm md:text-base text-[#71C0BB]">Years Excellence</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
