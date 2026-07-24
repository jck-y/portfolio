import React from "react";
import GlassCard from "../GlassCard";

const experience = [
  {
    role: "ICT Teacher",
    org: "SMA Citra Kasih",
    period: "Aug 2025 – Jun 2026",
    desc: "Taught 80 students (Grades 10–12) Python, data science, and generative AI guiding LLM chatbot and object-detection projects.",
  },
  {
    role: "Fullstack Dev & DevOps",
    org: "Manado Post",
    period: "Jul 2024 – Jan 2025",
    desc: "Built and integrated an AI chatbot into a React Native app in an 8-person agile team; owned Play Store releases for an app with 10,000+ downloads.",
  },
  {
    role: "Freelance Web & Mobile Developer",
    org: "Self-employed",
    period: "2024 – Present",
    desc: "Building custom web and mobile products, using AI tools (Claude, Stitch, Gemini) to speed up delivery.",
  },
  {
    role: "Assistant Lecturer",
    org: "Universitas Klabat",
    period: "2022 – 2025",
    desc: "Mentored 500 students in Computer Programming and evaluated assignments via Google Classroom.",
  },
];

const projects = [
  {
    name: "Manado Post App & AI Chatbot",
    desc: "React Native news app with an integrated LLM chatbot, debugged and optimized in production.",
  },
  {
    name: "Stunting Case Monitoring App",
    desc: "React Native app tracking and visualizing stunting cases across North Minahasa.",
  },
  {
    name: "Student Council (OSIS) E-Voting System",
    desc: "Secure, transparent React web app for streamlined student council elections.",
  },
  {
    name: "Student Fitness Tracking Platform",
    desc: "Strava-inspired React dashboard for teachers to monitor student activity (PE class).",
  },
  {
    name: "Digital Graduation Invitation Platform",
    desc: "Responsive React platform streamlining 12th-grade graduation registration.",
  },
];

const ResumePages = () => {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-6">
        <span className="w-4 h-px bg-violet-300" />
        <span className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-300">
          Experience &amp; Work
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Experience */}
        <GlassCard className="p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white mb-7">Experience</h2>
          <div className="border-l border-white/[0.1] space-y-7">
            {experience.map((item, i) => (
              <div key={i} className="relative pl-6">
                <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(185,140,242,0.6)]" />
                <h3 className="text-[15.5px] font-semibold text-gray-100">
                  {item.role}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5 mb-2">
                  {item.org} • {item.period}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Projects */}
        <GlassCard className="p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white mb-7">Projects</h2>
          <div className="space-y-3">
            {projects.map((p, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all"
              >
                <h4 className="text-white text-sm font-semibold mb-1">
                  {p.name}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ResumePages;
