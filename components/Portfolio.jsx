import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiCalendar, FiTool, FiAward, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "residential", label: "Residential" },
    { id: "hotels", label: "Hotels" },
    { id: "commercial", label: "Commercial" },
    { id: "offices", label: "Offices" }
  ];

  const projects = [
    {
      id: 1,
      title: "Berger Conference Room",
      category: "offices",
      location: "Berger, Abuja",
      duration: "2 months",
      scope: "Redesigned and furnished a modern corporate conference room with custom furniture, acoustic panels, and contemporary lighting to enhance productivity and aesthetics.",
      challenges: "Delivering a highly functional design within a tight timeframe while ensuring effective soundproofing and maintaining a sleek corporate look.",
      results: "The project produced a professional, comfortable, and inspiring conference space that strengthens brand image and improves meeting experiences.",
      images: [
        "/BCR1.jpg",
        "/BCR.jpg",
        "/BCR1.jpg"
      ],
      featured: true,
      year: "2025"
    },
    {
      id: 2,
      title: "Fully Furnished Home",
      category: "residential",
      location: "Abuja CBD",
      duration: "24 months",
      scope: "Comprehensive furnishing of a luxury residence, covering living spaces, bedrooms, kitchen, and outdoor areas with bespoke pieces and premium finishes.",
      challenges: "Ensuring design consistency across a multi-year project while sourcing durable and high-quality materials that matched the client’s vision.",
      results: "The result was a timeless home that blends elegance with comfort, offering the client a functional living environment with a luxurious feel.",
      images: [
        "/FullyFH.jpg",
        "/KF.jpg",
        "/Hero2.jpg"
      ],
      featured: true,
      year: "2023"
    },
    {
      id: 3,
      title: "Minimalistic Redesign for a techie",
      category: "renovation",
      location: "Ikoyi, Lagos",
      duration: "6 weeks",
      scope: "Redesigned a bachelor’s apartment with a sleek minimalistic concept, incorporating clean lines, functional furniture, and smart storage solutions tailored for a modern tech lifestyle.",
      challenges: "Balancing a minimalist aesthetic with the client’s need for tech integration, ensuring the space remained uncluttered while accommodating multiple devices and work setups.",
      results: "Delivered a stylish, clutter-free living space that reflects the client’s personality, enhances productivity, and maintains a calming modern feel.",
      images: [
        "/JpTvLight.jpg",
        "/Josefbed.jpg",
        "FullyFk.jpg"
      ],
      featured: false,
      year: "2024"
    },
    {
      id: 4,
      title: "Massage & Beauty Salon",
      category: "commercial",
      location: "Abuja",
      duration: "6 weeks",
      scope: "Designed and furnished a contemporary wellness salon, including reception, treatment rooms, and lighting to create a relaxing client experience.",
      challenges: "Maximizing limited floor space while achieving a calm and luxurious environment within a short delivery period.",
      results: "The final salon provided a premium look and feel, elevating customer experience and positioning the business as a high-end wellness destination.",
      images: [
        "/RecepF.jpg",
        "/CleanO.jpg",
        "/Mbed.png"
      ],
      featured: true,
      year: "2024"
    },
    {
      id: 5,
      title: "Service Apartment",
      category: "hotels",
      location: "Guzape, Abuja",
      duration: "2 months",
      scope: "Furnished and styled a modern service apartment with tailored interiors for living spaces, bedrooms, and kitchen to suit short- and long-term guests.",
      challenges: "Creating a design that balanced style and durability while appealing to both corporate and leisure travelers.",
      results: "The apartment now offers a comfortable, modern, and functional stay experience that has boosted client satisfaction and occupancy rates.",
      images: [
        "/SA.jpg",
        "/SA1.jpg",
        "/Her05.jpg"
      ],
      featured: false,
      year: "2024"
    },
    {
      id: 6,
      title: "Hotel Furnishing",
      category: "hotels",
      location: "Umuahia, Abia State",
      duration: "4 months",
      scope: "Complete furnishing of a boutique hotel including guest rooms, lobby, dining areas, and executive suites with a cohesive modern design.",
      challenges: "Coordinating large-scale production and installation of furniture across multiple areas while adhering to strict timelines.",
      results: "The finished project delivered a stylish and comfortable hotel interior that enhanced guest experience and elevated the brand’s market presence.",
      images: [
        "/CalicoH.jpg",
        "/turant.png",
        "/turant2.jpg"
      ],
      featured: true,
      year: "2025"
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const featuredProjects = projects.filter(project => project.featured);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

// Auto image slideshow on card hover
useEffect(() => {
  if (!selectedProject) {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const max = projects.find(p => p.featured)?.images.length || 1;
        return prev === max - 1 ? 0 : prev + 1;
      });
    }, 4000); // Change image every 4s

    return () => clearInterval(interval);
  }
}, [selectedProject]);


  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-[#71C0BB]">Portfolio</span>
          </h2>
          <div className="w-24 h-1 bg-[#143c2d] mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our diverse range of successful projects spanning residential, commercial, 
            and infrastructure developments across Nigeria.
          </p>
        </motion.div>

        {/* Featured Projects Carousel */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center" id="featured-collection">
            Featured Collection
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-green-800 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {project.year}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-800 transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex items-center text-gray-600 mb-3">
                    <FiMapPin className="mr-2" size={16} />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.scope}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-green-800 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-green-100 hover:text-green-600"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    key={currentImageIndex}
                    src={project.images[currentImageIndex]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-800 transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FiMapPin className="mr-2" size={14} />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <FiCalendar className="mr-2" size={14} />
                    <span className="text-sm">{project.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {project.scope.substring(0, 80)}...
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={closeProjectModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={closeProjectModal}
                    className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                  
                  {/* Image Carousel */}
                  <div className="relative h-80 md:h-96">
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                        >
                          <FiChevronLeft size={24} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                        >
                          <FiChevronRight size={24} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {selectedProject.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentImageIndex ? "bg-white" : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Project Details */}
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                      {selectedProject.title}
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <FiMapPin className="text-green-600 mt-1" size={20} />
                            <div>
                              <h4 className="font-semibold text-gray-800">Location</h4>
                              <p className="text-gray-600">{selectedProject.location}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <FiCalendar className="text-green-600 mt-1" size={20} />
                            <div>
                              <h4 className="font-semibold text-gray-800">Duration</h4>
                              <p className="text-gray-600">{selectedProject.duration}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <FiTool className="text-green-600 mt-1" size={20} />
                            <div>
                              <h4 className="font-semibold text-gray-800">Project Scope</h4>
                              <p className="text-gray-600">{selectedProject.scope}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <FiTool className="text-green-600" size={18} />
                              Key Challenges
                            </h4>
                            <p className="text-gray-600">{selectedProject.challenges}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <FiAward className="text-green-600" size={18} />
                              Results & Achievements
                            </h4>
                            <p className="text-gray-600">{selectedProject.results}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;