import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePages from "./pages/HomePages";
import AboutMe from "./pages/AboutMe";
import ResumePages from "./pages/ResumePages";
import ContactPages from "./pages/ContactPages";
import EduPages from "./pages/EduPages";
import "./styles/global.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/resume" element={<ResumePages />} />
        <Route path="/edu" element={<EduPages />} />
        <Route path="/contact" element={<ContactPages />} />
      </Routes>
    </Router>
  );
};

export default App;
