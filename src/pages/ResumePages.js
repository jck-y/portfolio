import React from "react";
import GlassCard from "../GlassCard";
import SectionLabel from "../components/SectionLabel";
import ProjectShowcase from "../components/ProjectShowcase";
import { projects } from "../data/projects";

const experience = [
  {
    role: "ICT Teacher",
    org: "SMA Citra Kasih",
    period: "Aug 2025 – Jun 2026",
    desc: "Taught 80 students (Grades 10-12) advanced concepts in Python, Data Science, and Generative AI, successfully guiding them to build functional LLM chatbots and object-detection projects.",
  },
  {
    role: "Fullstack Dev & DevOps",
    org: "Manado Post",
    period: "Jul 2024 – Jan 2025",
    desc: "Integrated an AI chatbot into the Manado Post React Native app and managed Google Play deployment, debugging, and optimization to ensure stability for a user base of 10.000+ downloads.",
  },
  {
    role: "Freelance Web & Mobile Developer",
    org: "Self-employed",
    period: "2024 – Present",
    desc: "Developed multiple production-ready web and mobile apps with React serving 100+ active users, leveraging AI-assisted coding tools to accelerate software delivery.",
  },
  {
    role: "Assistant Lecturer",
    org: "Universitas Klabat",
    period: "2022 – 2025",
    desc: "Mentored a total of 500 students in Computer Programming (Python) and streamlined the evaluation of coursework and assignments via Google Classroom.",
  },
];

const ResumePages = () => {
  return (
    <div>
      <SectionLabel>Experience &amp; Work</SectionLabel>

      {/* Projects — screenshot showcase, above Experience */}
      <div className="mb-16 md:mb-20">
        <h2 className="font-display text-xl font-medium text-ink-950 mb-6">
          Projects
        </h2>
        <div className="space-y-4 lg:space-y-5">
          {projects.map((project, i) => (
            <ProjectShowcase key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <h2 className="font-display text-xl font-medium text-ink-950 mb-6">
          Experience
        </h2>
        <GlassCard className="p-8 md:p-10">
          <div className="relative border-l border-paper-300 space-y-8 max-w-2xl">
            {experience.map((item, i) => (
              <div key={i} className="relative pl-7">
                <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-4 ring-rose-500/10" />
                <h3 className="text-[15.5px] font-semibold text-ink-950">
                  {item.role}
                </h3>
                <div className="flex flex-wrap items-baseline gap-x-2.5 mt-1 mb-2.5">
                  <span className="text-sm text-ink-800">{item.org}</span>
                  <span className="text-xs text-ink-500">{item.period}</span>
                </div>
                <p className="text-sm text-ink-600 leading-relaxed">
                  {item.desc}
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
