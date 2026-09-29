import React from "react";

const skills = [
  "React",
  "React Native",
  "JavaScript",
  "Python",
  "Laravel",
  "Supabase",
  "PostgreSQL",
  "LLM Integration",
  "Prompt Engineering",
  "Machine Learning",
  "Git & GitHub",
  "Scrum (Agile)",
];

const softSkills = [
  "Analytical Thinking",
  "Problem Solving",
  "Teamwork",
  "Communication",
];

const Education2D = () => {
  return (
    <div className="two-d-education">
      <div className="two-d-education-main">
        <span className="two-d-small-label">DEGREE</span>

        <h3>Bachelor of Computer Science</h3>

        <p>Universitas Klabat</p>

        <span className="two-d-muted">
          2021 – 2025 · Magna Cum Laude · GPA 3.82
        </span>
      </div>

      <div className="two-d-education-languages">
        <span className="two-d-small-label">LANGUAGES</span>

        <div>
          English
          <small>Intermediate</small>
        </div>

        <div>
          Indonesian
          <small>Native</small>
        </div>
      </div>

      <div className="two-d-skills">
        <span className="two-d-small-label">TECHNICAL STACK</span>

        <div className="two-d-chip-list">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        <div className="two-d-softskills">
          {softSkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education2D;
