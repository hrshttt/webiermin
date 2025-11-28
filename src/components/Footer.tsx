import React, { useRef, useState } from "react";
import {
  Instagram,
  Twitter,
  Linkedin,
  Dribbble,
  Github,
} from "lucide-react";

/* -----------------------------------------------
   TYPE DEFINITIONS
----------------------------------------------- */

interface FooterColumnProps {
  title: string;
  links: string[];
}

interface MagneticSocialIconProps {
  icon: React.ReactNode; // Fixed: Changed JSX.Element to React.ReactNode
}

interface Position {
  x: number;
  y: number;
}

/* -----------------------------------------------
   MAIN FOOTER
----------------------------------------------- */

const Footer = () => {
  // Fixed: Removed unused 'copied', 'email', and 'handleCopy' variables

  return (
    <footer className="relative bg-[#3533cd] text-white pb-24 overflow-hidden">

      {/* TICKER */}
      <div className="w-full py-6 bg-black/20 border-b border-white/10 backdrop-blur-sm overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="font-display text-4xl font-bold uppercase tracking-tight text-white/90">
                Let's Create Impact
              </span>
              <StarIcon />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-28">

        {/* GRID */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-20">

          {/* LEFT TEXT */}
          <div className="flex flex-col gap-8 max-w-xl">
            <h3 className="font-display text-6xl md:text-7xl font-black leading-[0.9]">
              Webier <br />
              Agency.
            </h3>

            <p className="font-sans text-white/80 text-xl leading-relaxed max-w-md font-light">
              We exist to eliminate the gap between{" "}
              <span className="font-bold">human intent</span> and{" "}
              <span className="font-bold">digital execution</span>.
            </p>
          </div>

          {/* RIGHT COLUMNS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24">
            <FooterColumn
              title="Navigation"
              links={["Work", "Services", "Agency", "Careers"]}
            />
            <FooterColumn
              title="Socials"
              links={["Instagram", "Twitter", "LinkedIn", "Awwwards"]}
            />
            <FooterColumn title="Legal" links={["Privacy", "Terms"]} />
          </div>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-6 mt-20">
          <MagneticSocialIcon icon={<Instagram size={20} />} />
          <MagneticSocialIcon icon={<Twitter size={20} />} />
          <MagneticSocialIcon icon={<Linkedin size={20} />} />
          <MagneticSocialIcon icon={<Dribbble size={20} />} />
          <MagneticSocialIcon icon={<Github size={20} />} />
        </div>

      </div>

      {/* WATERMARK */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center opacity-10 pointer-events-none">
        <h1 className="font-display font-black text-[22vw] tracking-tighter text-white leading-none translate-y-[20%]">
          WEBIER
        </h1>
      </div>

    </footer>
  );
};

/* -----------------------------------------------
   FOOTER COLUMN Component
----------------------------------------------- */

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div className="flex flex-col gap-6">
    <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
      {title}
    </span>

    {links.map((item: string) => (
      <a
        key={item}
        href="#"
        className="text-2xl md:text-3xl font-bold text-white/90 hover:text-white transition"
      >
        {item}
      </a>
    ))}
  </div>
);

/* -----------------------------------------------
   STAR ICON (STATIC)
----------------------------------------------- */

const StarIcon = () => (
  <svg width="24" height="24" fill="currentColor" className="text-white/50">
    <path d="M12 0L14.6 9.4 24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6L12 0z" />
  </svg>
);

/* -----------------------------------------------
   MAGNETIC SOCIAL ICON
----------------------------------------------- */

const MagneticSocialIcon = ({ icon }: MagneticSocialIconProps) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });

  return (
    <a
      href="#"
      ref={ref}
      // Fixed: Added explicit React.MouseEvent type
      onMouseMove={(e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        setPos({
          x: (e.clientX - (rect.left + rect.width / 2)) * 0.5,
          y: (e.clientY - (rect.top + rect.height / 2)) * 0.5,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#3533cd] transition-all"
    >
      {icon}
    </a>
  );
};

export default Footer;