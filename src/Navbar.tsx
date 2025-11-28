import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  // 1. Refs typed explicitly
  const navRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // 1. Scroll Show/Hide Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);

      if (scrollDifference > 10) {
        if (isScrollingDown && currentScrollY > 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate Navbar Show/Hide
  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      yPercent: isVisible && !isMobileMenuOpen ? 0 : isMobileMenuOpen ? 0 : -140,
      opacity: isVisible || isMobileMenuOpen ? 1 : 0,
      duration: 0.8,
      ease: 'power4.out'
    });
  }, [isVisible, isMobileMenuOpen]);

  // Mobile Menu Animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      
      tl.to(mobileMenuRef.current, {
        yPercent: 0, 
        duration: 0.8,
        ease: "power4.inOut"
      })
      .fromTo(".mobile-link", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
      
    } else {
      document.body.style.overflow = '';
      
      gsap.to(mobileMenuRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut"
      });
    }
  }, [isMobileMenuOpen]);


  // 2. Spotlight Tracker Logic (Desktop)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!spotlightRef.current || !navRef.current || window.innerWidth < 768) return;
    const navRect = navRef.current.getBoundingClientRect();
    
    const x = e.clientX - navRect.left;
    
    gsap.to(spotlightRef.current, {
      x: x,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (!spotlightRef.current) return;
    
    gsap.to(spotlightRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.4
    });
  };

  const links = ['Work', 'Services', 'About', 'Contact'];

  return (
    <>
      {/* Mobile Fullscreen Menu */}
      <div 
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 w-full h-screen bg-[#3533cd] z-[9990] flex flex-col items-center justify-center ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ transform: 'translateY(-100%)' }} 
      >
        <div className="flex flex-col gap-8 text-center">
          {links.map((link) => (
             <a 
               key={link} 
               href={`#${link.toLowerCase()}`}
               onClick={() => setIsMobileMenuOpen(false)}
               className="mobile-link opacity-0 font-display text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter hover:text-black transition-colors duration-300"
             >
               {link}
             </a>
          ))}
          <div className="mobile-link opacity-0 mt-8">
            <button className="px-8 py-4 bg-white text-[#3533cd] rounded-full font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
              Let's Talk
            </button>
          </div>
        </div>
      </div>

      {/* Floating Navbar Container */}
      <div className="fixed top-6 left-0 w-full flex justify-center z-[9999] pointer-events-none px-4">
        <nav 
          ref={navRef}
          className="pointer-events-auto relative bg-white/70 backdrop-blur-2xl border border-white/40 shadow-xl shadow-black/5 rounded-full px-4 py-2 md:px-2 md:py-2 flex items-center justify-between md:justify-center md:gap-2 transition-transform duration-500 w-full md:w-auto max-w-[500px] md:max-w-none hover:scale-[1.01]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Spotlight */}
          <div 
            ref={spotlightRef}
            className="absolute top-1/2 left-0 w-24 h-24 bg-[#3533cd]/10 rounded-full blur-2xl -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-0 hidden md:block"
          />

          {/* Logo */}
          <a href="#" className="pl-2 md:pl-6 pr-6 relative z-10 group/logo">
             <span className="font-display font-black text-2xl tracking-tighter text-black">
               W
               <span className="text-[#3533cd] inline-block transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] group-hover/logo:rotate-[360deg]">.</span>
             </span>
          </a>

          {/* Links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((item) => (
              <MagneticItem key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="relative px-6 py-3 rounded-full overflow-hidden group/btn block"
                >
                  <span className="absolute inset-0 bg-[#3533cd] translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full z-0 will-change-transform"></span>
                  
                  <div className="relative z-10 flex flex-col h-[20px] overflow-hidden">
                      <span className="block text-xs font-bold uppercase tracking-widest text-black group-hover/btn:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] h-[20px] flex items-center justify-center">
                        {item}
                      </span>
                      <span className="block text-sm font-serif italic text-white group-hover/btn:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] absolute top-full left-0 w-full h-[20px] flex items-center justify-center">
                        {item}
                      </span>
                  </div>
                </a>
              </MagneticItem>
            ))}
          </ul>

          {/* CTA */}
          <div className="pl-4 pr-2 hidden md:block">
            <button 
              className="relative overflow-hidden bg-black text-white px-7 py-3 rounded-full text-xs uppercase font-bold tracking-widest group transition-all duration-300 hover:shadow-xl hover:shadow-[#3533cd]/20 active:scale-95"
            >
               <span className="relative z-10 group-hover:text-[#3533cd] transition-colors duration-300">Let's Talk</span>
               <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.85,0,0.15,1)] will-change-transform"></div>
            </button>
          </div>

          {/* Hamburger */}
          <button 
            className="md:hidden relative z-50 p-2 mr-1 w-10 h-10 flex flex-col justify-center gap-1.5 group cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

        </nav>
      </div>
    </>
  );
};

// Micro-Component: Magnetic Effect

// 3. Define Interface for children
interface MagneticItemProps {
    // FIX: Using 'any' for children allows passing the ref cleanly
    children: React.ReactElement<any>; 
}

const MagneticItem = ({ children }: MagneticItemProps) => {
    // 4. Fix Ref Type
    const magnetic = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = magnetic.current;
        if (!el) return;

        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

        // 5. Fix Native DOM Event Type
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = el.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            
            xTo(x * 0.25);
            yTo(y * 0.25);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        // These are native DOM events, not React events
        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // Clone element to pass the ref down
    return React.cloneElement(children, { ref: magnetic });
};

export default Navbar;