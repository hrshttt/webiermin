import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------------
   DATA
-------------------------------------------------- */
const projects = [
  {
    id: "01",
    client: "SAVERA",
    title: "SAVERA",
    year: "2024",
    desc: "A heritage-rich ultra-luxury real estate brand bridging Dubai and India. Designed with deep noir aesthetics, gold accents, and a timeless premium identity.",
    tags: ["Luxury Real Estate", "Brand Website", "GSAP", "Lenis"],
    img: "/savera.jpg",
    color: "#D4AF37", // Luxury Gold
    link: "https://savera-five.vercel.app/"
  },
  {
    id: "02",
    client: "VibeMaker",
    title: "VibeMaker",
    year: "2024",
    desc: "A highly animated, GSAP-powered digital marketing website with smooth Lenis scrolling, vibrant gradients, and a futuristic UI crafted for bold brand energy.",
    tags: ["Digital Agency", "Animations", "GSAP", "Lenis", "UI Design"],
    img: "/vibemaker.jpg",
    color: "#22C55E", // Neon Green
    link: "https://vibemaker-hazel.vercel.app/"
  },
  {
    id: "03",
    client: "Martini",
    title: "Martini",
    year: "2024",
    desc: "A high-value luxury restaurant experience for Pune, crafted with cinematic motion, warm premium tones, and immersive micro-interactions.",
    tags: ["Restaurant", "Luxury UI", "GSAP", "LocoScroll"],
    img: "/martini.jpg",
    color: "#C24E00", // Premium Copper/Amber
    link: "https://martini-self.vercel.app/"
  },
  {
    id: "04",
    client: "Luxe Realty",
    title: "Luxe Realty",
    year: "2024",
    desc: "A modern real estate website built with smooth interactions, clean aesthetics, pastel accents, and a professional polished layout.",
    tags: ["Real Estate", "Modern UI", "Animations"],
    img: "/luxe.jpg",
    color: "#00D6A3", // Aqua Green
    link: "https://luxe-realstate.vercel.app/"
  },
];


/* --------------------------------------------------
   COMPONENT
-------------------------------------------------- */

const SelectedWorks = () => {
  // FIX: Changed from HTMLElement to HTMLDivElement
  const componentRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Only run GSAP on Desktop
    if (window.innerWidth > 768) {
      const slider = sliderRef.current;
      const container = componentRef.current;
      if (!slider || !container) return;

      const totalWidth = slider.scrollWidth;
      const windowWidth = window.innerWidth;
      
      // LOGIC: Move left exactly enough so the END of the slider aligns with the END of the screen
      const xMove = -(totalWidth - windowWidth);

      gsap.to(slider, {
        x: xMove,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,     // Pinning enabled for Mobile too
          scrub: 1,
          start: "center center", 
          end: () => "+=" + (totalWidth), 
          invalidateOnRefresh: true,
        },
      });
    }
  }, { scope: componentRef });

  return (
    <section id="work" className="bg-[#f8f8f8] text-[#1a1a1a] pb-12 md:pb-0">
      
      {/* 1. HEADER */}
      <div className="w-full px-4 md:px-12 lg:px-24 pt-16 md:pt-24 pb-8 md:pb-12">
        <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-end md:text-left border-b border-black/10 pb-8">
          <div>
            <h2 className="font-display text-6xl md:text-9xl font-black uppercase tracking-tighter text-[#3533CD] leading-[0.85]">
              Selected <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px black" }}
              >
                Works
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-4 mt-6 md:mt-0 justify-center md:justify-start">
             <div className="w-3 h-3 bg-[#FFC947] rounded-full animate-pulse"></div>
             <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/50">
               / Recent Cases
             </p>
          </div>
        </div>
      </div>

      {/* 2. PINNED SCROLL AREA */}
      <div 
        ref={componentRef} 
        className="w-full h-screen overflow-hidden flex items-center bg-[#f8f8f8]"
      >
        <div 
          ref={sliderRef} 
          className="
            flex flex-row 
            gap-6 md:gap-12 
            px-4 md:px-12 lg:px-24 
            w-fit
          "
        >
          {projects.map((project, index) => (
            <a 
              href={project.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative flex-shrink-0 
                
                /* Responsive Widths & Heights */
                w-[85vw] md:w-[500px] lg:w-[600px] 
                h-[60vh] md:h-[70vh] 
                
                bg-white rounded-[2rem] p-3 shadow-sm hover:shadow-2xl transition-all duration-500 border border-black/5 flex flex-col block
                cursor-pointer
              "
            >
              {/* --- IMAGE AREA (Poster Style) --- */}
              <div 
                className="relative w-full h-[55%] rounded-[1.5rem] overflow-hidden"
                style={{ backgroundColor: project.color }} 
              >
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10 duration-500" />
                 
                 <img 
                   src={project.img} 
                   alt={project.title} 
                   className="w-full h-full object-cover transition-transform duration-[1s] ease-in-out group-hover:scale-110"
                 />
                 
                 {/* Floating View Button */}
                 <div className="hidden md:flex absolute inset-0 items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-24 h-24 bg-white/30 backdrop-blur-xl border border-white/50 rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                       <ArrowUpRight className="text-white w-8 h-8" />
                    </div>
                 </div>

              </div>

              {/* --- CONTENT AREA --- */}
              <div className="flex-1 flex flex-col justify-between pt-6 px-4 pb-4">
                  
                  {/* Title & Desc */}
                  <div className="mb-4 md:mb-0">
                    <div className="flex justify-between items-start mb-4">
                       <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-black leading-[0.9]">
                         {project.title}
                       </h3>
                       
                       <span className="font-display text-4xl md:text-5xl text-black/10 group-hover:text-black/20 transition-colors duration-500">
                         {project.id}
                       </span>
                    </div>

                    <p className="font-sans text-sm md:text-base text-black/60 leading-relaxed font-medium line-clamp-3">
                      {project.desc}
                    </p>
                  </div>

                  {/* Bottom: Tags & Footer */}
                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                       {project.tags.map((tag, i) => (
                         <span key={i} className="px-3 py-1.5 bg-[#f6f6fa] border border-black/5 rounded-full font-mono text-[10px] uppercase tracking-wide text-black/60 group-hover:bg-[#3533CD] group-hover:text-white transition-colors duration-300">
                           {tag}
                         </span>
                       ))}
                    </div>

                    <div className="w-full h-[1px] bg-black/5 mb-4"></div>

                    <div className="flex justify-between items-center">
                       
                       {/* Changed button to div to maintain valid HTML within anchor tag */}
                       <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:text-[#3533cd] transition-colors group/btn">
                         Case Study <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                       </div>
                    </div>
                  </div>
              </div>

            </a>
          ))}
          
          {/* Spacer to ensure last card is completely visible on ALL devices */}
          <div className="w-[5vw] h-full flex-shrink-0"></div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;