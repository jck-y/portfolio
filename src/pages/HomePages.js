import React, { useRef } from "react";
import ProfileCard from "../components/sections/ProfiileCard";
import AboutMe from "./AboutMe";
import ResumePages from "./ResumePages";
import EduPages from "./EduPages";
import ContactPages from "./ContactPages";
import "../styles/global.css";
import homeIcon from "../assets/icon/home.svg";
import profileIcon from "../assets/icon/profile.svg";
import resumeIcon from "../assets/icon/resume.svg";
import contactIcon from "../assets/icon/contact.svg";
import eduIcon from "../assets/icon/edu.svg";

const HomePages = () => {
  const homeRef = useRef(null);
  const aboutMeRef = useRef(null);
  const resumeRef = useRef(null);
  const eduRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-page">
      <div className="section" ref={homeRef}>
        <ProfileCard />
      </div>
      <div className="section" ref={aboutMeRef}>
        <AboutMe />
      </div>
      <div className="section" ref={resumeRef}>
        <ResumePages />
      </div>
      <div className="section" ref={eduRef}>
        <EduPages />
      </div>
      <div className="section" ref={contactRef}>
        <ContactPages />
      </div>
      <div className="nav-icons">
        <button onClick={() => scrollToSection(homeRef)}>
          <img src={homeIcon} alt="Home" className="icon" />
        </button>
        <button onClick={() => scrollToSection(aboutMeRef)}>
          <img src={profileIcon} alt="About Me" className="icon" />
        </button>
        <button onClick={() => scrollToSection(resumeRef)}>
          <img src={resumeIcon} alt="Resume" className="icon" />
        </button>
        <button onClick={() => scrollToSection(eduRef)}>
          <img src={eduIcon} alt="Edu" className="icon" />
        </button>
        <button onClick={() => scrollToSection(contactRef)}>
          <img src={contactIcon} alt="Contact" className="icon" />
        </button>
      </div>
    </div>
  );
};

export default HomePages;
