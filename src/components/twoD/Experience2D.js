import React from "react";

const experience = [
  {
    role: "ICT Teacher",
    org: "SMA Citra Kasih",
    period: "Aug 2025 – Jun 2026",
    desc: "Taught 80 students in Python, Data Science, and Generative AI, guiding them to build functional LLM chatbots and object-detection projects.",
  },
  {
    role: "Fullstack Dev & DevOps",
    org: "Manado Post",
    period: "Jul 2024 – Jan 2025",
    desc: "Integrated an AI chatbot into the Manado Post React Native app and handled deployment, debugging, and optimization.",
  },
  {
    role: "Freelance Web & Mobile Developer",
    org: "Self-employed",
    period: "2024 – Present",
    desc: "Developed production-ready web and mobile applications using React and AI-assisted development workflows.",
  },
  {
    role: "Assistant Lecturer",
    org: "Universitas Klabat",
    period: "2022 – 2025",
    desc: "Mentored students in Computer Programming with a focus on Python and streamlined coursework evaluation.",
  },
];

const Experience2D = () => {
  return (
    <div className="two-d-experience">
      {experience.map((item, index) => (
        <article key={item.role} className="two-d-experience-row">
          <div className="two-d-experience-index">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="two-d-experience-marker">
            <span />
          </div>

          <div className="two-d-experience-content">
            <div className="two-d-experience-header">
              <div>
                <h3>{item.role}</h3>
                <p>{item.org}</p>
              </div>

              <time>{item.period}</time>
            </div>

            <p className="two-d-experience-description">{item.desc}</p>
          </div>

          <span className="two-d-row-arrow">↗</span>
        </article>
      ))}
    </div>
  );
};

export default Experience2D;
