import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProfileCard from "../components/sections/ProfiileCard";
import AboutMe from "./AboutMe";
import ResumePages from "./ResumePages";
import EduPages from "./EduPages";
import ContactPages from "./ContactPages";
import "../styles/global.css";

// Inline icons — no external asset files needed, keeps the dock self-contained.
const icons = {
  home: (
    <path
      d="M4 12L12 5l8 7M6 10v9h12v-9"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  about: (
    <path
      d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 20a7 7 0 0114 0"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  resume: (
    <path
      d="M7 3h7l4 4v14H7V3zm7 0v4h4M9 12h6M9 16h6"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  edu: (
    <path
      d="M3 8l9-4 9 4-9 4-9-4zm5 3v5c0 1.5 2 3 4 3s4-1.5 4-3v-5"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  contact: (
    <path
      d="M4 5h16v14H4V5zm0 0l8 7 8-7"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

const DockIcon = ({ name }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="w-[18px] h-[18px]"
  >
    {icons[name]}
  </svg>
);

const HomePages = () => {
  const homeRef = useRef(null);
  const aboutMeRef = useRef(null);
  const resumeRef = useRef(null);
  const eduRef = useRef(null);
  const contactRef = useRef(null);
  const [active, setActive] = useState("Home");
  const reduceMotion = useReducedMotion();

  const navItems = [
    { ref: homeRef, icon: "home", label: "Home" },
    { ref: aboutMeRef, icon: "about", label: "About" },
    { ref: resumeRef, icon: "resume", label: "Resume" },
    { ref: eduRef, icon: "edu", label: "Education" },
    { ref: contactRef, icon: "contact", label: "Contact" },
  ];

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  // Scroll-spy: highlight the dock item for the section in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = navItems.find((n) => n.ref.current === entry.target);
            if (item) setActive(item.label);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    navItems.forEach((item) => {
      if (item.ref.current) observer.observe(item.ref.current);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen bg-ink-950 text-mist-200 font-sans selection:bg-accent-400/25 pb-40 overflow-x-clip">
      {/* Background: faint engineering grid + restrained ambient glows */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-dots"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(720px circle at 12% -5%, rgba(52,211,153,0.07), transparent 45%), radial-gradient(640px circle at 88% 12%, rgba(255,255,255,0.05), transparent 45%), radial-gradient(900px circle at 50% 110%, rgba(52,211,153,0.04), transparent 50%)",
        }}
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 pt-24 md:pt-36 px-5 sm:px-8 md:px-12 max-w-container mx-auto"
        ref={homeRef}
      >
        <ProfileCard onContact={() => scrollToSection(contactRef)} />
      </motion.div>

      <div className="relative z-10 px-5 sm:px-8 md:px-12 max-w-container mx-auto mt-24 space-y-24 md:mt-32 md:space-y-36">
        <div ref={aboutMeRef} className="scroll-mt-24 md:scroll-mt-28">
          <AboutMe />
        </div>
        <div ref={resumeRef} className="scroll-mt-24 md:scroll-mt-28">
          <ResumePages />
        </div>
        <div ref={eduRef} className="scroll-mt-24 md:scroll-mt-28">
          <EduPages />
        </div>
        <div ref={contactRef} className="scroll-mt-24 md:scroll-mt-28">
          <ContactPages />
        </div>
      </div>

      {/* Floating dock navigation, with labels on hover and active-section state */}
      {/* Centering uses framer-motion `x` so the entrance animation doesn't
          override the horizontal offset (Tailwind -translate-x-1/2 would be
          replaced by motion's inline transform and push the dock right). */}
      <motion.div
        initial={reduceMotion ? false : { x: "-50%", y: 80, opacity: 0 }}
        animate={{ x: "-50%", y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-4 sm:bottom-7 left-1/2 z-50"
      >
        <nav className="flex items-center gap-0.5 p-1 sm:p-1.5 rounded-2xl bg-ink-900/85 border border-white/[0.08] backdrop-blur-xl shadow-[0_20px_50px_-16px_rgba(0,0,0,0.85)]">
          {navItems.map((item) => {
            const isActive = active === item.label;
            return (
              <div key={item.label} className="relative group">
                <span className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[11px] font-mono text-mist-200 whitespace-nowrap bg-ink-800 border border-white/[0.08] rounded-lg px-2.5 py-1 shadow-lg">
                  {item.label}
                </span>
                <button
                  onClick={() => scrollToSection(item.ref)}
                  aria-label={item.label}
                  className={`relative p-2 sm:p-2.5 rounded-xl text-mist-500 transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/[0.08]"
                      : "hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <DockIcon name={item.icon} />
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-400" />
                  )}
                </button>
              </div>
            );
          })}
        </nav>
      </motion.div>
    </div>
  );
};

export default HomePages;
