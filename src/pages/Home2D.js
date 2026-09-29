import React from "react";

import { motion, useReducedMotion } from "framer-motion";

import PortfolioHeader2D from "../components/twoD/PortfolioHeader2D";
import SectionShell2D from "../components/twoD/SectionShell2D";
import Experience2D from "../components/twoD/Experience2D";
import Education2D from "../components/twoD/Education2D";
import Contact2D from "../components/twoD/Contact2D";
import DepthBackground2D from "../components/twoD/DepthBackground2D";

import ProjectShowcase from "../components/ProjectShowcase";

import { projects } from "../data/projects";

import "../styles/home2d.css";

const Home2D = () => {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion
      ? false
      : {
          opacity: 0,
          y: 18,
        },

    whileInView: {
      opacity: 1,
      y: 0,
    },

    viewport: {
      once: true,
      amount: 0.08,
    },

    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  };

  return (
    <main className="home2d">
      {/* Animated background */}
      <DepthBackground2D />

      {/* Main content layer */}
      <div className="home2d-content">
        {/* IMPORTANT:
            This wrapper must contain the ENTIRE portfolio.
        */}
        <div className="home2d-page">
          <PortfolioHeader2D />

          <nav className="two-d-nav">
            <a href="#about">About</a>
            <a href="#resume">Resume</a>
            <a href="#education">Education</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>

          <SectionShell2D
            id="about"
            number="01"
            eyebrow="PROFILE"
            title="About Me"
            annotation="A developer who likes building things and explaining how they work."
          >
            <motion.div {...reveal}>
              <div className="two-d-about">
                <div className="two-d-about-copy">
                  <h3>
                    Full-stack engineer
                    <em> with a teaching habit.</em>
                  </h3>

                  <p>
                    I'm a Computer Science graduate from Universitas Klabat,
                    specializing in mobile apps, web platforms, and applied AI.
                  </p>

                  <p>
                    I've shipped React Native products, built practical tracking
                    systems, integrated LLM chatbots, and mentored students in
                    programming, Machine Learning, and Generative AI.
                  </p>
                </div>

                <div className="two-d-stats">
                  <div>
                    <strong>500+</strong>
                    <span>students mentored</span>
                  </div>

                  <div>
                    <strong>10K+</strong>
                    <span>app downloads</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </SectionShell2D>

          <SectionShell2D
            id="resume"
            number="02"
            eyebrow="CAREER"
            title="Resume"
            annotation="Selected experience, shipped products, and lessons from building in the real world."
          >
            <motion.div {...reveal}>
              <Experience2D />
            </motion.div>
          </SectionShell2D>

          <SectionShell2D
            id="education"
            number="03"
            eyebrow="BACKGROUND"
            title="Education"
            annotation="The technical foundation behind the work."
          >
            <motion.div {...reveal}>
              <Education2D />
            </motion.div>
          </SectionShell2D>

          <SectionShell2D
            id="projects"
            number="04"
            eyebrow="SELECTED WORK"
            title="Projects"
            annotation="A visual record of products, experiments, and systems I've built."
          >
            <motion.div {...reveal} className="two-d-projects">
              {projects.map((project, index) => (
                <div key={project.slug} className="two-d-project-item">
                  <ProjectShowcase project={project} index={index} />
                </div>
              ))}
            </motion.div>
          </SectionShell2D>

          <SectionShell2D
            id="contact"
            number="05"
            eyebrow="NEXT STEP"
            title="Contact"
            annotation="Have an idea, project, or opportunity? Let's talk."
          >
            <motion.div {...reveal}>
              <Contact2D />
            </motion.div>
          </SectionShell2D>

          <footer className="two-d-footer">
            <div>
              <strong>JK</strong>
              <span>Jacky Karongkong</span>
            </div>

            <span>© {new Date().getFullYear()}</span>

            <a href="#top">Back to top ↑</a>
          </footer>
        </div>
        {/* END .home2d-page */}
      </div>
      {/* END .home2d-content */}
    </main>
  );
};

export default Home2D;
