import React from "react";
import GlassCard from "../GlassCard";
import SectionLabel from "../components/SectionLabel";

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
      <SectionLabel>Education &amp; Skills</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        {/* Education */}
        <GlassCard className="p-8 md:p-10">
          <h2 className="font-display text-xl font-semibold text-mist-100 mb-6">
            Education
          </h2>
          <h3 className="text-[15.5px] font-semibold text-mist-100">
            Bachelor of Computer Science
          </h3>
          <p className="text-mist-400 text-sm mt-1">Universitas Klabat</p>
          <p className="font-mono text-xs text-mist-500 mt-2">
            2021 – 2025 · Magna Cum Laude, GPA 3.82
          </p>

          <div className="mt-8 pt-6 border-t border-white/[0.07]">
            <h3 className="eyebrow mb-3">Languages</h3>
            <p className="text-sm text-mist-400">English – Intermediate</p>
            <p className="text-sm text-mist-400 mt-1">Indonesian – Native</p>
          </div>
        </GlassCard>

        {/* Skills */}
        <GlassCard className="p-8 md:p-10 md:col-span-2">
          <h2 className="font-display text-xl font-semibold text-mist-100 mb-6">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill, i) => (
              <span key={i} className="chip">
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.07] flex flex-wrap gap-2.5">
            {softSkills.map((skill, i) => (
              <span key={i} className="chip">
                {skill}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Achievements */}
        <GlassCard className="p-8 md:p-10 md:col-span-3">
          <h2 className="font-display text-xl font-semibold text-mist-100 mb-6">
            Achievements
          </h2>
          <div className="divide-y divide-white/[0.06]">
            {achievements.map((a, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-5 first:pt-0 last:pb-0"
              >
                <div className="font-mono text-sm font-medium text-accent-300 sm:w-28 flex-shrink-0">
                  {a.place}
                </div>
                <div className="text-sm text-mist-400">{a.detail}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default EduPages;
