import React from "react";
import GlassCard from "../GlassCard";

const skills = [
  "React",
  "React Native",
  "Python",
  "AI-Assisted Coding",
  "LLM / Prompt Engineering",
  "DevOps · Play Store",
  "Git / GitHub",
  "Canva",
  "Data Structures",
  "Systems Analysis & Design",
];

const softSkills = [
  "Analytical Thinking",
  "Problem Solving",
  "Teamwork",
  "Communication",
];

const achievements = [
  { place: "3rd Place", detail: "Indoneris National Essay Competition, 2024" },
  {
    place: "3rd Place",
    detail: "Klabat University Research Competition, 2025",
  },
  { place: "5th Place", detail: "Innovation Project, SMA Citra Kasih, 2026" },
];

const EduPages = () => {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-6">
        <span className="w-4 h-px bg-violet-300" />
        <span className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-300">
          Education &amp; Skills
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Education */}
        <GlassCard className="p-8 md:col-span-1">
          <h2 className="text-xl font-semibold text-white mb-5">Education</h2>
          <h3 className="text-[15.5px] font-semibold text-gray-100">
            Bachelor of Computer Science
          </h3>
          <p className="text-gray-400 text-sm">Universitas Klabat</p>
          <p className="text-xs text-gray-500 mt-1">
            2021 – 2025 · Magna Cum Laude, GPA 3.82
          </p>

          <div className="mt-6 pt-6 border-t border-white/[0.08]">
            <h3 className="text-sm font-medium text-gray-200 mb-2">
              Languages
            </h3>
            <p className="text-sm text-gray-400">English – Intermediate</p>
            <p className="text-sm text-gray-400">Indonesian – Native</p>
          </div>
        </GlassCard>

        {/* Skills */}
        <GlassCard className="p-8 md:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-5">Skills</h2>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-gray-300 hover:bg-white/[0.09] hover:text-white hover:-translate-y-0.5 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-wrap gap-2.5">
            {softSkills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-gray-300 hover:bg-white/[0.09] hover:text-white hover:-translate-y-0.5 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Achievements */}
        <GlassCard className="p-8 md:col-span-3">
          <h2 className="text-xl font-semibold text-white mb-5">
            Achievements
          </h2>
          <div className="flex flex-wrap gap-8">
            {achievements.map((a, i) => (
              <div key={i}>
                <div className="text-white font-semibold">{a.place}</div>
                <div className="text-sm text-gray-400">{a.detail}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default EduPages;
