import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ProjectGallery() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/project`, {
  //   cache: "no-store",
  // });

  let dbProjects = [];
  try {
   const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/project`, {
      cache: "no-store",
    });

    if (res.ok) {
      dbProjects = await res.json();
      } else {
      console.error("Failed to fetch projects:", res.status);
      }
    } catch (err) {
      console.error("Error parsing JSON or fetching projects:", err);
  }


  const localProjects = [
    {
      image: "/projects/Froom.jpg",
      description: "Contemporary building showcasing modern architectural design",
    },
    {
      image: "/projects/FullyFk.jpg",
      description: "Elegantly designed living space with modern furnishings",
    },
    {
      image: "/projects/Hero4.jpg",
      description: "Spacious commercial kitchen featuring efficient layout",
    },
    {
      image: "/projects/Kitchen.jpg",
      description: "Comfortable reception area designed for relaxation",
    },
    {
      image: "/projects/Hero6.jpg",
      description: "Luxurious master bedroom with premium furnishings",
    },
    {
      image: "/projects/OfficeF.jpg",
      description: "Landscaped pathway through residential grounds",
    },
    {
      image: "/projects/turant2.jpg",
      description: "Sleek duplex design with modern amenities",
    },
    {
      image: "/projects/JpTvConsole.jpg",
      description: "Stylishly decorated bedroom with attention to detail",
    },
    {
      image: "/projects/turant1.jpg",
      description: "Multi-purpose space combining parking and fitness area",
    },
    {
      image: "/projects/p19.jpg",
      description: "Contemporary living room with elegant furnishings",
    },
    {
      image: "/projects/p20.jpg",
      description: "Striking duplex exterior with modern architecture",
    },
    {
      image: "/projects/p23.jpg",
      description: "Inviting outdoor dining space",
    },
    {
      image: "/projects/p30.jpg",
      description: "Professional office space with contemporary design",
    },
  ];

  const allProjects = [...localProjects, ...dbProjects];

  return (
    <main className="min-h-screen bg-gray-200">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Our Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allProjects.map((project, i) => (
            <div
              key={i}
              className="relative overflow-hidden group rounded-lg shadow-md"
            >
              <Image
                width={500}
                height={500}
                src={project._id ? `/api/project/${project._id}` : project.image}
                alt={`bandbproject ${i + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="text-white text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <p className="text-lg font-medium">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
