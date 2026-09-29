import React from "react";

const experience = [
  {
    role: "ICT Teacher",
    org: "SMA Citra Kasih",
    period: "Aug 2025 – Jun 2026",
    desc: "Taught 80 students (Grades 10–12) advanced concepts in Python, Data Science, and Generative AI, successfully guiding them to build functional LLM chatbots and object-detection projects.",
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

const Experience2D = () => {
  return (
    <div className="experience2d">
      {experience.map((item, index) => (
        <article className="experience2d-item" key={index}>
          <div className="experience2d-marker">
            <span />
          </div>

          <div className="experience2d-content">
            <div className="experience2d-top">
              <div>
                <h3>{item.role}</h3>
                <p className="experience2d-org">{item.org}</p>
              </div>

              <span className="experience2d-period">{item.period}</span>
            </div>

            <p className="experience2d-description">{item.desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Experience2D;
