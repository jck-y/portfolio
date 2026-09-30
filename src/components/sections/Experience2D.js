import React from "react";

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
