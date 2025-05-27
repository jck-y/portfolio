import React from "react";
import "../styles/global.css";

const ResumePages = () => {
  return (
    <div className="resume-section">
      <h2>Resume</h2>
      <div className="qualification-content">
        <div className="qualification-item">
          <h3>Professional Experience</h3>
          <h4>Teaching Assistant, Universitas Klabat</h4>
          <p>2022 - 2025</p>
          <ul>
            <li>
              Assisted in teaching Computer Programming with Python, Data
              Structures, and Systems Analysis and Design.
            </li>
            <li>
              Supported students with hands-on coding exercises and project
              guidance.
            </li>
          </ul>
          <h4>Internship, Manado Post</h4>
          <p>2024</p>
          <ul>
            <li>
              Developed and enhanced the Manado Post application with AI
              features using LLM Open AI.
            </li>
            <li>
              Specialized in prompt engineering to optimize AI performance.
            </li>
            <li>
              Collaborated with the team to implement new functionalities.
            </li>
          </ul>
        </div>
      </div>
      <div className="projects-content">
        <h3>Projects</h3>
        <div className="projects-grid">
          <div className="project-card">
            <h4>Manado Post Application</h4>
            <p>
              A cross-platform mobile app developed using React Native for news
              and updates.
            </p>
          </div>
          <div className="project-card">
            <h4>Stunting Risk Data Tracking App</h4>
            <p>
              A React Native application for tracking and managing data on
              at-risk children.
            </p>
          </div>
          <div className="project-card">
            <h4>Website with React + Vite</h4>
            <p>
              A responsive website built for class projects using React and
              Vite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePages;
