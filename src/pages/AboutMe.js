import React from "react";
import "../styles/global.css";

const AboutMe = () => {
  return (
    <div className="home-page">
      <div className="section about-me-section">
        <h2>ABOUT ME</h2>
        <div className="about-me-content">
          <p>
            I am a Full Stack Developer and Informatics graduate from
            Universitas Klabat. I’ve worked on projects like the Manado Post app
            (React Native), a stunting risk tracking app, and React + Vite
            websites. As a teaching assistant for a year, I supported Python,
            Data Structures, and Systems Analysis courses. My internship at
            Manado Post involved AI development with LLM Open AI and prompt
            engineering. I also bring hardware knowledge and project management
            skills from leading team projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
