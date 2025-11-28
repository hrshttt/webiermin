import React, { useEffect, useState, useRef } from 'react';
import { Trophy, Globe, Users, Zap, Star, ArrowUpRight } from 'lucide-react';

// 1. Define the shape of a Stat object
interface Stat {
  id: string;
  type: string;
  value: number;
  suffix: string;
  label: string;
  sub: string;
  desc: string;
  colSpan: string;
  icon: React.ElementType | null;
}

const stats: Stat[] = [
  { 
    id: "metric-01",
    type: "primary", 
    value: 40, 
    suffix: "M+", 
    label: "Economic Impact", 
    sub: "Revenue generated for clients",
    desc: "We don't just design; we drive growth. Our strategic interventions have unlocked over $40M in new value streams for our partners across fintech and commerce.",
    colSpan: "md:col-span-2",
    icon: Zap
  },
  { 
    id: "metric-02",
    type: "standard", 
    value: 50, 
    suffix: "+", 
    label: "Products Shipped", 
    sub: "Digital Experiences",
    desc: "From 0 to 1. Full-cycle product development.",
    colSpan: "md:col-span-1",
    icon: null
  },
  { 
    id: "metric-03",
    type: "standard", 
    value: 14, 
    suffix: "", 
    label: "Global Awards", 
    sub: "Industry Recognition",
    desc: "Awwwards, FWA & CSSDA winners.",
    colSpan: "md:col-span-1",
    icon: Trophy
  },
  { 
    id: "metric-04",
    type: "wide", 
    value: 8, 
    suffix: "", 
    label: "Global Footprint", 
    sub: "Countries Served",
    desc: "Our code runs in 12+ time zones. We build localized experiences with a global mindset, serving users from Tokyo to San Francisco.",
    colSpan: "md:col-span-2",
    icon: Globe
  },
  { 
    id: "metric-05",
    type: "standard", 
    value: 98, 
    suffix: "%", 
    label: "Retention Rate", 
    sub: "Client Satisfaction",
    desc: "Building legacy through long-term trust.",
    colSpan: "md:col-span-1",
    icon: Star
  },
  { 
    id: "metric-06",
    type: "standard", 
    value: 25, 
    suffix: "+", 
    label: "Team Experts", 
    sub: "Designers & Engineers",
    desc: "A multidisciplinary collective of obsessives.",
    colSpan: "md:col-span-1",
    icon: Users
  }
];

const Achievements = () => {
  // 2. Fix Ref type for Section
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-white text-[#1a1a1a] py-32 px-4 md:px-8 font-sans"
    >
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header - Editorial Style */}
        <div className="flex flex-col gap-12 mb-24 pb-8 border-b border-[#1a1a1a]/10">
          <div className="flex justify-between items-end">
             <h2 className="text-[12vw] md:text-[9rem] font-black leading-[0.8] tracking-tighter uppercase text-[#1a1a1a]">
               Our<br/>
               <span className="text-transparent" style={{ WebkitTextStroke: '2px #1a1a1a' }}>Impact</span>
             </h2>
             <div className="hidden md:flex flex-col items-end gap-2 mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/60">
                   Performance • 2024
                </span>
             </div>
          </div>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <BentoCard 
              key={stat.id} 
              stat={stat} 
              isVisible={isVisible} 
              delay={index * 150}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

// 3. Define Props for Sub-component
interface BentoCardProps {
  stat: Stat;
  isVisible: boolean;
  delay: number;
}

const BentoCard = ({ stat, isVisible, delay }: BentoCardProps) => {
  const [count, setCount] = useState(0);
  // 4. Fix Ref type for Div
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // FIXED: Removed unused 'isHovering' state

  // Count Up Logic
  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = stat.value;
      const duration = 2000; 
      const incrementTime = Math.max(10, Math.abs(Math.floor(duration / (end || 1))));

      const timer = setInterval(() => {
        if (start < end) {
           start += 1;
           setCount(start);
        } else {
           clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isVisible, stat.value]);

  // 5. Fix Event type
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      // FIXED: Removed unused onMouseEnter/onMouseLeave handlers
      className={`
        group relative bg-white rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden
        transition-all duration-700 ease-out hover:shadow-2xl hover:-translate-y-1
        ${stat.colSpan}
      `}
      style={{ 
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {/* SPOTLIGHT EFFECT LAYER */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
        }}
      />

      {/* Top Row: Icon & Label */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 border border-[#1a1a1a]/10 px-2 py-1 rounded-full w-fit group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {stat.sub}
            </span>
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-[#1a1a1a]">
                {stat.label}
            </h3>
        </div>
        {stat.icon && (
            <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#1a1a1a] group-hover:bg-[#3533cd] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                <stat.icon size={18} />
            </div>
        )}
      </div>

      {/* Middle: The Number */}
      <div className="relative z-10 mb-6">
        <div className="flex items-baseline">
            <span className={`font-black tracking-tighter text-[#1a1a1a] leading-none transition-colors duration-300 group-hover:text-[#3533cd] ${stat.type === 'primary' ? 'text-7xl md:text-9xl' : 'text-6xl md:text-7xl'}`}>
                {count}
            </span>
            <span className={`font-thin text-[#1a1a1a]/40 ml-1 ${stat.type === 'primary' ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'}`}>
                {stat.suffix}
            </span>
        </div>
      </div>

      {/* Bottom: Description */}
      <div className="relative z-10">
        <p className="font-sans text-sm md:text-base text-[#1a1a1a]/60 leading-relaxed font-medium max-w-md group-hover:text-[#1a1a1a]/80 transition-colors">
            {stat.desc}
        </p>
      </div>
      
      {/* Hover Reveal Arrow */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
         <ArrowUpRight className="text-[#3533cd]" size={24} />
      </div>

    </div>
  );
};

export default Achievements;