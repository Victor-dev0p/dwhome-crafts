// app/projects/page.jsx - FIXED VERSION
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Pointer } from "lucide-react";

export const dynamic = "force-dynamic";

export default function ProjectGallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the correct base URL
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
          (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
        
        console.log('Fetching from:', `${baseUrl}/api/project`);

        const res = await fetch(`${baseUrl}/api/project`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
          // Add timeout
          signal: AbortSignal.timeout(30000), // 30 second timeout
        });

        console.log('Response status:', res.status);

        if (res.ok) {
          const dbProjects = await res.json();
          console.log('DB Projects:', dbProjects);

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
          const errorData = await res.text();
          console.error("Failed to fetch projects:", res.status, errorData);
          setError(`Failed to load projects: ${res.status}`);
          
          // Still show local projects if DB fails
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
          setProjects(localProjects);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
        
        // Fallback to local projects
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
        setProjects(localProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-200">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Our Projects
        </h1>

        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            <p>⚠️ {error}</p>
            <p className="text-sm">Showing available projects...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project._id || i}
              className="relative overflow-hidden group rounded-lg shadow-md cursor-pointer"
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            >
              <Image
                width={500}
                height={500}
                src={project._id ? `/api/project/${project._id}` : project.image}
                alt={`dwhcproject ${i + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  console.error('Image failed to load:', project);
                  e.target.src = '/placeholder-image.jpg'; // Add a placeholder image
                }}
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gray-900/70 flex items-center justify-center text-center p-4 transition-opacity duration-300 ${
                  activeIndex === i ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
                }`}
              >
                <p className="text-white text-lg font-medium">
                  {project.description || "Beautiful project by DWHome & Crafts"}
                </p>
              </div>

              {/* Mobile Tap Hint */}
              {activeIndex === null && (
                <div className="absolute bottom-2 right-2 md:hidden flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-md text-xs animate-bounce">
                  <Pointer size={14} /> Tap Me
                </div>
              )}
            </div>
          ))}
        </div>

        {projects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No projects found.</p>
          </div>
        )}
      </div>
    </main>
  );
}