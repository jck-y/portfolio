import React, { useRef } from "react";
import { motion } from "framer-motion";
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
    className="w-5 h-5"
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

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navItems = [
    { ref: homeRef, icon: "home", label: "Home" },
    { ref: aboutMeRef, icon: "about", label: "About" },
    { ref: resumeRef, icon: "resume", label: "Resume" },
    { ref: eduRef, icon: "edu", label: "Education" },
    { ref: contactRef, icon: "contact", label: "Contact" },
  ];

  return (
    <div className="relative min-h-screen bg-[#08090B] text-gray-200 font-sans selection:bg-indigo-400/40 pb-32 overflow-hidden">
      {/* Ambient mesh background — signature atmosphere for the whole page */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(600px circle at 15% 10%, rgba(108,108,244,0.10), transparent 40%), radial-gradient(500px circle at 85% 25%, rgba(185,140,242,0.08), transparent 40%), radial-gradient(700px circle at 50% 90%, rgba(108,108,244,0.06), transparent 40%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 pt-24 md:pt-32 px-6 md:px-20 max-w-6xl mx-auto"
        ref={homeRef}
      >
        <ProfileCard />
      </motion.div>

      <div className="relative z-10 px-6 md:px-20 max-w-6xl mx-auto mt-20 space-y-20">
        <div ref={aboutMeRef}>
          <AboutMe />
        </div>
        <div ref={resumeRef}>
          <ResumePages />
        </div>
        <div ref={eduRef}>
          <EduPages />
        </div>
        <div ref={contactRef}>
          <ContactPages />
        </div>
      </div>

      {/* Floating dock navigation, Apple-style */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-1.5 p-2.5 rounded-full bg-[#0D0E11]/70 border border-white/[0.09] backdrop-blur-2xl shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.ref)}
              aria-label={item.label}
              className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              <DockIcon name={item.icon} />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HomePages;
