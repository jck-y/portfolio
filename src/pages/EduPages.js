import React from "react";
import "../styles/global.css";

const EducationPages = () => {
  return (
    <div className="section education-section">
      <h2>Knowledge</h2>
      <div className="qualification-content">
        <div className="qualification-item">
          <h3>Education</h3>
          <p>Bachelor of Informatics, Universitas Klabat</p>
          <p>2021 - 2025</p>
          <p>GPA: 3.5</p>
        </div>
        <div className="qualification-item">
          <h3>Skills</h3>
          <ul>
            <li>Full Stack Development (React, React Native, Vite)</li>
            <li>AI Development with LLM Open AI</li>
            <li>Prompt Engineering</li>
            <li>Computer Programming (Python)</li>
            <li>Data Structures (Python) </li>
            <li>Systems Analysis and Design</li>
            <li>Project Management</li>
            <li>Agile Development (Scrum)</li>
            <li>Hardware Knowledge</li>
          </ul>
        </div>
        <div className="qualification-item">
          <h3>Language</h3>
          <p>English – Intermediate </p>
          <p>Indonesian – Native</p>
        </div>
      </div>
    </div>
  );
};

export default EducationPages;
