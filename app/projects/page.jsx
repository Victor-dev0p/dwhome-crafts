"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Pointer } from "lucide-react";

export const dynamic = "force-dynamic";

export default function ProjectGallery() {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/project`,
          { cache: "no-store" }
        );

        if (res.ok) {
          const dbProjects = await res.json();
          const localProjects = [
            { image: "/Nproj/ClassyL4.jpg", description: "" },
            { image: "/Nproj/LVChairSet2.jpg", description: "" },
            { image: "/Nproj/Pbed2.jpg", description: "Luxurious master bedroom with premium furnishings" },
            { image: "/Nproj/Kitchen.jpg", description: "" },
            { image: "/Nproj/Pjs.jpg", description: "" },
            { image: "/Nproj/Pjs1.jpg", description: "" },
            { image: "/projects/turant2.jpg", description: "" },
            { image: "/Nproj/JpTvConsole.jpg", description: "" },
            { image: "/projects/turant1.jpg", description: "" },
            { image: "/Nproj/Pjs5.jpg", description: "" },
            { image: "/Nproj/Pjs6.jpg", description: "" },
            { image: "/Nproj/Plounge1.jpg", description: "" },
            { image: "/Nproj/ClassyL2.jpg", description: "" },
          ];

          setProjects([...localProjects, ...dbProjects]);
        } else {
          console.error("Failed to fetch projects:", res.status);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-gray-200">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Our Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="relative overflow-hidden group rounded-lg shadow-md cursor-pointer"
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            >
              <Image
                width={500}
                height={500}
                src={project._id ? `/api/project/${project._id}` : project.image}
                alt={`dwhcproject ${i + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gray-900/70 flex items-center justify-center text-center p-4 transition-opacity duration-300 ${
                  activeIndex === i ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
                }`}
              >
                <p className="text-white text-lg font-medium">{project.description}</p>
              </div>

              {/* Mobile Tap Hint (only show before first click) */}
              {activeIndex === null && (
                <div className="absolute bottom-2 right-2 md:hidden flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-md text-xs animate-bounce">
                  <Pointer size={14} /> Tap Me
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
