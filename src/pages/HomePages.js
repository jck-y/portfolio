import React, { Suspense, useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ProfileCard from "../components/sections/ProfiileCard";
import AboutMe from "./AboutMe";
import ResumePages from "./ResumePages";
import EduPages from "./EduPages";
import ContactPages from "./ContactPages";
import "../styles/global.css";

// Three.js + R3F + drei are heavy — loaded as their own chunk so they
// never block the first paint.
const Scene3D = React.lazy(() => import("../components/three/Scene3D"));

const SECTIONS = {
  about: {
    label: "About",
    Component: AboutMe,
  },
  resume: {
    label: "Resume & Projects",
    Component: ResumePages,
  },
  education: {
    label: "Education",
    Component: EduPages,
  },
  contact: {
    label: "Contact",
    Component: ContactPages,
  },
};

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
  education: (
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

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    className="w-5 h-5"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const HomePages = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [resetSignal, setResetSignal] = useState(0);
  const reduceMotion = useReducedMotion();

  const openSection = useCallback((key) => {
    if (SECTIONS[key]) {
      setActiveSection(key);
    }
  }, []);

  const closeSection = useCallback(() => {
    setActiveSection(null);
    setResetSignal((n) => n + 1);
  }, []);

  // Esc closes whatever panel is open.
  useEffect(() => {
    if (!activeSection) {
      return undefined;
    }

    const onKey = (e) => {
      if (e.key === "Escape") {
        closeSection();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [activeSection, closeSection]);

  const navItems = [
    {
      key: "home",
      icon: "home",
      label: "Home",
    },
    {
      key: "about",
      icon: "about",
      label: "About",
    },
    {
      key: "resume",
      icon: "resume",
      label: "Resume",
    },
    {
      key: "education",
      icon: "education",
      label: "Education",
    },
    {
      key: "contact",
      icon: "contact",
      label: "Contact",
    },
  ];

  const ActivePanel = activeSection ? SECTIONS[activeSection].Component : null;

  return (
    <div className="app-shell bg-paper-50 text-ink-800 font-sans selection:bg-rose-400/20">
      {/* The 3D world fills the viewport and is the primary interface. */}
      <Suspense fallback={null}>
        <Scene3D
          activeSection={activeSection}
          onEnterPortal={openSection}
          resetSignal={resetSignal}
        />
      </Suspense>

      {/* HUD — identity card, top-left, over the world. */}
      <div className="absolute top-5 left-5 md:top-8 md:left-8 z-20">
        <ProfileCard onContact={() => openSection("contact")} />
      </div>

      {/* Drive hint — hidden once a panel is open. */}
      {!activeSection && (
        <div className="absolute top-5 right-5 md:top-8 md:right-8 z-20 hidden sm:block bg-paper-50/90 backdrop-blur border border-paper-300 rounded-full px-4 py-2 text-xs text-ink-500">
          WASD / panah untuk berkendara, dekati objek untuk membuka
        </div>
      )}

      {/* Floating dock navigation. */}
      <motion.div
        initial={reduceMotion ? false : { x: "-50%", y: 80, opacity: 0 }}
        animate={{ x: "-50%", y: 0, opacity: 1 }}
        transition={{
          delay: 0.4,
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed bottom-4 sm:bottom-7 left-1/2 z-20"
      >
        <nav className="flex items-center gap-0.5 p-1 sm:p-1.5 rounded-2xl bg-paper-50/95 border border-paper-300 backdrop-blur-xl shadow-[0_20px_50px_-24px_rgba(26,22,32,0.4)]">
          {navItems.map((item) => {
            const isActive =
              item.key === "home" ? !activeSection : activeSection === item.key;

            return (
              <div key={item.key} className="relative group">
                <span className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-paper-50 whitespace-nowrap bg-ink-950 rounded-lg px-2.5 py-1">
                  {item.label}
                </span>

                <button
                  onClick={() =>
                    item.key === "home" ? closeSection() : openSection(item.key)
                  }
                  aria-label={item.label}
                  className={`relative p-2 sm:p-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-rose-500 bg-rose-500/10"
                      : "text-ink-500 hover:text-ink-950 hover:bg-ink-950/[0.05]"
                  }`}
                >
                  <DockIcon name={item.icon} />
                </button>
              </div>
            );
          })}
        </nav>
      </motion.div>

      {/* Content panel. */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-30 bg-ink-950/30 flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeSection();
              }
            }}
          >
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 28,
                      scale: 0.98,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                reduceMotion
                  ? {}
                  : {
                      opacity: 0,
                      y: 16,
                      scale: 0.98,
                    }
              }
              transition={{
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative bg-paper-50 w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl overflow-y-auto shadow-[0_40px_80px_-24px_rgba(26,22,32,0.45)]"
            >
              <button
                onClick={closeSection}
                aria-label="Tutup"
                className="sticky top-4 float-right mr-4 z-10 p-2 rounded-full bg-paper-100 border border-paper-300 text-ink-600 hover:text-ink-950 hover:border-ink-950/[0.2]"
              >
                <CloseIcon />
              </button>

              <div className="px-6 py-8 sm:px-10 sm:py-12 clear-both">
                {ActivePanel && <ActivePanel />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePages;
