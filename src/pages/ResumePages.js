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
    desc: "Taught 80 students across Grades 10–12 in Python, Data Science, Machine Learning, NLP, and Generative AI. Guided students through hands-on projects including LLM-based chatbots and object-detection applications using Python and Google Teachable Machine. Also taught web development with HTML, CSS, and JavaScript, guiding students in building personal portfolio websites.",
  },

  {
    role: "Full-Stack Developer & Mobile Engineer",
    org: "Manado Post",
    period: "Jul 2024 – Jan 2025",
    desc: "Contributed to the development and maintenance of the Manado Post React Native production application with 10,000+ downloads. Integrated a GPT-4o mini-powered AI chatbot with RAG, voice interaction, and text-to-speech (TTS). Developed AI-powered news summarization and subscription-based access control for AI features, and contributed to a North Sulawesi Governor Election simulation feature. Also handled Google Play releases, deployment, debugging, and performance optimization.",
  },

  {
    role: "Freelance Web & Mobile Developer",
    org: "Self-employed",
    period: "2024 – Present",
    desc: "Developed web and mobile applications for various use cases using React, React Native, Laravel, Python, Supabase, and Firebase. Projects include an employee travel request system with role-based approval workflows and automated web/WhatsApp notifications, a face-recognition attendance system with GPS validation and face embedding verification, a student fitness tracking platform with geolocation and photo verification, and an OSIS e-voting system with voter authorization, duplicate-vote prevention, and real-time election tallying.",
  },

  {
    role: "Assistant Lecturer",
    org: "Universitas Klabat",
    period: "2022 – 2025",
    desc: "Assisted Computer Programming classes and mentored approximately 500 students in total. Helped students understand Python fundamentals, programming concepts, and problem-solving through hands-on exercises using Google Colab. Also supported coursework evaluation and provided technical feedback through Google Classroom.",
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
