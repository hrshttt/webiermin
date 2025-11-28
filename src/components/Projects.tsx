import { useState } from "react";
import { ArrowUpRight, ArrowRight, Sparkles, ExternalLink } from "lucide-react";

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */

interface ProjectType {
  id: string;
  title: string;
  category: string;
  year: string;
  link?: string;
  desc: string;
  story: string;
  tags: string[];
  roles: string[];
  img: string;
}

interface ProjectItemProps {
  project: ProjectType;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

/* --------------------------------------------------
   DATA
-------------------------------------------------- */

const projects: ProjectType[] = [
  {
    id: "01",
    title: "Lumina",
    category: "Fintech",
    year: "2024",
    link: "https://example.com/lumina",
    desc: "Reimagining the financial stack for the next generation...",
    story:
      "The banking industry suffers from a legacy of trust issues and clunky interfaces...",
    tags: ["Mobile App", "Biometrics", "UX System", "Identity"],
    roles: ["Product Strategy", "UI/UX Design", "React Native Dev"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "02",
    title: "Vanguard",
    category: "Architecture",
    year: "2023",
    link: "https://example.com/vanguard",
    desc: "Digital brutalism for sustainable architecture...",
    story:
      "Vanguard needed a digital presence that matched their philosophy of 'honest materials'...",
    tags: ["Web Platform", "WebGL", "Art Direction", "3D"],
    roles: ["Creative Direction", "3D Modeling", "Web Development"],
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "03",
    title: "Elevate",
    category: "Commerce",
    year: "2024",
    link: "https://example.com/elevate",
    desc: "Commerce that anticipates...",
    story:
      "Traditional e-commerce is static. Elevate is dynamic. We built a recommendation engine...",
    tags: ["E-Commerce", "AI Model", "Strategy", "Branding"],
    roles: ["Brand Identity", "CX Strategy", "Full Stack Dev"],
    img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "04",
    title: "Nexo",
    category: "Analytics",
    year: "2023",
    desc: "Data clarity. Transforming complex datasets...",
    story:
      "Data paralysis is real. Executives are drowning in metrics but starving for insights...",
    tags: ["SaaS Dashboard", "Data Viz", "Product Design", "System"],
    roles: ["Information Arch.", "Data Viz", "Frontend Eng."],
    img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=1600",
  },
];

/* --------------------------------------------------
   MAIN COMPONENT
-------------------------------------------------- */

const Projects = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      className="relative w-full bg-white text-[#1a1a1a] py-32 px-4 md:px-8 min-h-screen font-sans"
      id="work"
    >
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-12 mb-32 pb-8 border-b border-[#1a1a1a]/20">
          <div className="flex justify-between items-end">
            <h2 className="text-[12vw] md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase">
              Selected <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2px #1a1a1a" }}
              >
                Works
              </span>
            </h2>

            <div className="hidden md:flex flex-col items-end gap-2 mb-4">
              <Sparkles size={24} className="text-[#1a1a1a] animate-spin-slow" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60">
                Archive • 2023 — 24
              </span>
            </div>
          </div>
        </div>

        {/* Project Items */}
        <div className="flex flex-col">
          {projects.map((p) => (
            <ProjectItem
              key={p.id}
              project={p}
              isActive={activeId === p.id}
              onHover={() => setActiveId(p.id)}
              onLeave={() => setActiveId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* --------------------------------------------------
   PROJECT ITEM
-------------------------------------------------- */

const ProjectItem = ({
  project,
  isActive,
  onHover,
  onLeave,
}: ProjectItemProps) => {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative w-full border-b border-[#1a1a1a]/20 cursor-default transition-colors duration-500"
    >
      <div className="relative z-10 w-full py-8 md:py-12 transition-all duration-700">
        {/* Top Row */}
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex items-baseline gap-8 md:gap-24 w-full">
            <span
              className={`font-mono text-xs md:text-sm font-bold transition-all duration-500 ${
                isActive ? "text-[#1a1a1a] -translate-y-2" : "text-[#1a1a1a]/40"
              }`}
            >
              ({project.id})
            </span>

            <h3
              className={`text-5xl md:text-8xl font-black uppercase tracking-tighter transition-all duration-700 ${
                isActive ? "translate-x-8 text-[#1a1a1a]" : "text-[#1a1a1a]/80"
              }`}
            >
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-12 shrink-0">
            <span
              className={`hidden md:block font-mono text-xs uppercase tracking-widest transition-all duration-500 ${
                isActive ? "text-[#1a1a1a]" : "text-[#1a1a1a]/40"
              }`}
            >
              {project.category}
            </span>

            <div
              className={`w-16 h-16 flex items-center justify-center border border-[#1a1a1a]/10 rounded-full transition-all duration-500 group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] group-hover:scale-110`}
            >
              <ArrowUpRight className="w-6 h-6 text-[#1a1a1a] group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>

        {/* Expandable Section */}
        <div
          className={`grid overflow-hidden transition-all duration-1000 ${
            isActive
              ? "grid-rows-[1fr] opacity-100 mt-12 md:mt-20"
              : "grid-rows-[0fr] opacity-0 mt-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-0 border-t border-[#1a1a1a]/10 pt-12">
              {/* IMAGE */}
              <div className="w-full lg:w-[55%] relative group/image pr-0 lg:pr-12">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[16/9] overflow-hidden bg-[#d4d4d4] cursor-pointer"
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] scale-110 group-hover/image:scale-100 grayscale-[20%] group-hover/image:grayscale-0"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full flex items-center gap-3 translate-y-4 group-hover/image:translate-y-0 transition-transform">
                      <span className="text-white font-mono text-xs uppercase tracking-widest">
                        Visit Site
                      </span>
                      <ExternalLink size={14} className="text-white" />
                    </div>
                  </div>
                </a>

                {/* ROLES */}
                <div className="flex gap-8 mt-6 border-t border-[#1a1a1a]/10 pt-4">
                  {project.roles.map((role: string, i: number) => (
                    <span
                      key={i}
                      className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/50"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* TEXT SECTION */}
              <div className="w-full lg:w-[45%] flex flex-col justify-between mt-12 lg:mt-0">
                <div className="flex flex-col gap-10">
                  <div>
                    <span className="block font-mono text-[10px] uppercase text-[#1a1a1a]/40 mb-4">
                      The Brief
                    </span>
                    <p className="font-serif text-2xl md:text-3xl leading-tight italic text-[#1a1a1a]">
                      "{project.desc}"
                    </p>
                  </div>

                  <div>
                    <span className="block font-mono text-[10px] uppercase text-[#1a1a1a]/40 mb-4">
                      The Solution
                    </span>
                    <p className="text-base md:text-lg leading-relaxed text-[#1a1a1a]/80 max-w-xl">
                      {project.story}
                    </p>
                  </div>

                  {/* TAG MARQUEE */}
                  <div className="overflow-hidden border-y border-[#1a1a1a]/10 py-4 mt-4">
                    <div className="flex gap-8 whitespace-nowrap animate-marquee">
                      {[...project.tags, ...project.tags].map(
                        (tag: string, i: number) => (
                          <span
                            key={i}
                            className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60"
                          >
                            ● {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase text-[#1a1a1a]/40 mb-2">
                      Year
                    </span>
                    <span className="text-sm font-bold uppercase tracking-wide">
                      {project.year}
                    </span>
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex items-center gap-4 text-sm font-black uppercase tracking-widest"
                  >
                    Open Case Study
                    <div className="bg-[#1a1a1a] text-white p-3 rounded-full group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform">
                      <ArrowRight size={16} />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
