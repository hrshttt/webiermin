import { useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------
   Type Definitions
--------------------------------------------------------- */
type DivRef = HTMLDivElement | null;
type ParagraphRef = HTMLParagraphElement | null;

const Philosophy = () => {
  const containerRef = useRef<DivRef>(null);
  const textRef = useRef<ParagraphRef>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  /* ---------------------------------------------------------
      GSAP SPLIT + ANIMATIONS
  --------------------------------------------------------- */
  useLayoutEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;
    const titleElement = titleRef.current;
    const lineElement = lineRef.current;

    if (!container || !textElement || !titleElement || !lineElement) return;

    const ctx = gsap.context(() => {
      /* 1. Split text into words */
      const words = textElement.innerText.split(" ");
      textElement.innerHTML = words
        .map(
          (word: string) =>
            // Maine "transition-colors" hata diya kyunki ab hover effect nahi hai
            `<span class="word inline-block opacity-10 cursor-default" style="transform-origin: center bottom;">${word}&nbsp;</span>`
        )
        .join("");

      const wordElements = textElement.querySelectorAll<HTMLSpanElement>(".word");

      /* 2. Scroll Animation — Title */
      gsap.fromTo(
        titleElement,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
          },
        }
      );

      /* Divider line */
      gsap.fromTo(
        lineElement,
        { width: 0 },
        {
          width: "4rem",
          duration: 1,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
          },
        }
      );

      /* Paragraph word stagger reveal (Scroll Animation Only) */
      gsap.fromTo(
        wordElements,
        {
          opacity: 0.1,
          y: 20,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          color: "#000000",
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textElement,
            start: "top 85%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      // Maine yahan se Hover Logic remove kar di hai

    }, container);

    return () => ctx.revert();
  }, []);

  /* ---------------------------------------------------------
      MOUSE FOLLOW GLOW
  --------------------------------------------------------- */
  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;

    if (!container || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!container || !glow) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        x,
        y,
        duration: 1,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ---------------------------------------------------------
      RENDER
  --------------------------------------------------------- */
  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-32 px-6 md:px-12 lg:px-24 bg-[#f6f6fa] overflow-hidden"
    >
      {/* Glow */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#148ac4] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* LEFT */}
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <h2
              ref={titleRef}
              className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tighter text-BLACK leading-none"
            >
              The <br />
              <span className="text-[#3533CD]">Philosophy</span>
            </h2>

            <div
              ref={lineRef}
              className="h-1.5 bg-[#3533cd] mt-6 rounded-full"
            ></div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-8">
          <p
            ref={textRef}
            className="font-sans text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.15] text-[#000000] tracking-tight"
          >
            We believe that digital products should be more than just
            functional. They should be intuitive, immersive, and memorable.
            We blend strategy with art to create websites that don't just load —
            they live.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
