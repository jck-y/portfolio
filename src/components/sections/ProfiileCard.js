import React from "react";
import GlassCard from "../../GlassCard";

const ProfileCard = ({ onContact }) => {
  const handleContact = (e) => {
    e.preventDefault();
    onContact?.();
  };

  return (
    <GlassCard className="p-8 md:p-12 lg:p-14">
      <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-12">
        {/* Portrait — framed like a product shot */}
        <div className="relative flex-shrink-0">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-panel overflow-hidden ring-1 ring-white/[0.12] bg-ink-850 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.8)]">
            <img
              src="/images.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg border border-white/[0.08] bg-ink-900 flex items-center justify-center font-mono text-[10px] text-accent-300 shadow-lg">
            {"</>"}
          </span>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-6 font-mono text-[11px] tracking-[0.14em] uppercase text-mist-400">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            Available for Contract &amp; Fulltime Roles
          </div>

          <h1 className="font-display text-[2.5rem] leading-[1.02] md:text-6xl lg:text-7xl font-semibold tracking-tightest text-mist-100">
            Jacky Karongkong
          </h1>
          <p className="font-mono text-sm md:text-base text-accent-300 mt-3">
            Software Engineer
          </p>
          <p className="text-mist-400 mt-5 max-w-xl leading-relaxed">
            Building AI-powered mobile &amp; web products, from React and React
            Native and creating/integrate LLM that can suit needs.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-8">
            <a
              href="#contact"
              onClick={handleContact}
              className="btn btn-primary group"
            >
              Get in touch <span className="arrow">→</span>
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
      </div>
    </GlassCard>
  );
};

export default ProfileCard;
