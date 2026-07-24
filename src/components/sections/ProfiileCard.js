import React from "react";
import GlassCard from "../../GlassCard";
const ProfileCard = () => {
  return (
    <GlassCard className="p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-10">
        <div className="w-28 h-28 md:w-32 md:h-32 flex-shrink-0 rounded-[1.5rem] overflow-hidden shadow-[0_20px_60px_-10px_rgba(108,108,244,0.35)]">
          <img
            src="/images.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs text-gray-400 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            Available for freelance &amp; full-time roles
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.02]">
            Jacky Karongkong
          </h1>
          <p className="text-indigo-300 font-medium mt-2 text-lg">
            Software Engineer
          </p>
          <p className="text-gray-400 mt-4 max-w-xl leading-relaxed">
            Building AI-powered mobile &amp; web products — from React Native
            apps with 10,000+ downloads to LLM chatbots in the classroom.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-6">
            <a
              href="#contact"
              className="px-6 py-3 rounded-2xl text-sm font-semibold bg-gradient-to-br from-indigo-400 to-violet-400 text-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(108,108,244,0.4)] transition-all"
            >
              Get in touch →
            </a>
            <a
              href="https://github.com/jck-y"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl text-sm font-semibold border border-white/[0.1] bg-white/[0.03] text-white hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jacky-karongkong-70a896293/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl text-sm font-semibold border border-white/[0.1] bg-white/[0.03] text-white hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all"
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
