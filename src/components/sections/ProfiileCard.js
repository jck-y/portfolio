import React from "react";

/**
 * Compact identity HUD — sits over the 3D world instead of being a
 * full-width hero block, since the world itself is now the page's
 * opening moment. Solid paper background (not glass) so it stays
 * legible against whatever's moving behind it.
 */
const ProfileCard = ({ onContact }) => {
  const handleContact = (e) => {
    e.preventDefault();
    onContact?.();
  };

  return (
    <div className="pointer-events-auto bg-paper-50 border border-paper-300 rounded-panel shadow-[0_18px_40px_-20px_rgba(26,22,32,0.35)] p-5 md:p-6 w-[calc(100vw-2.5rem)] max-w-sm">
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-panel overflow-hidden ring-1 ring-paper-300">
            <img
              src="/images.webp"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-md border border-paper-300 bg-ink-950 flex items-center justify-center font-mono text-[9px] text-rose-300">
            {"</>"}
          </span>
        </div>
        <div>
          <h1 className="font-display text-xl md:text-2xl font-medium leading-tight text-ink-950">
            Jacky Karongkong
          </h1>
          <p className="text-sm text-rose-500 mt-0.5">Software Engineer</p>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-paper-300 bg-paper-100 mt-4 text-xs text-ink-600">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        Available for contract &amp; fulltime roles
      </div>

      <p className="text-sm text-ink-600 mt-4 leading-relaxed">
        Building web and mobile applications with React and React Native, while
        integrating practical AI, LLM, and full-stack solutions.
      </p>

      <div className="flex flex-wrap gap-2.5 mt-5">
        <a href="#contact" onClick={handleContact} className="btn btn-primary">
          Get in touch
        </a>
        <a
          href="https://github.com/jck-y"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/jacky-karongkong-70a896293/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
