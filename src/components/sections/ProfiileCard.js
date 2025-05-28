import React from "react";
import profileImage from "../../assets/images/JackyKarongkong.jpg";
import instagramIcon from "../../assets/icon/instagram.svg";
import linkedinIcon from "../../assets/icon/linkedin.svg";
import whatsappIcon from "../../assets/icon/whatsapp.svg";
import githubIcon from "../../assets/icon/github.svg";
import cvPdf from "../../assets/pdf/cv.pdf";
import "../../styles/global.css";

const ProfileCard = () => {
  return (
    <div className="profile-card-container">
      <div className="profile-image">
        <img src={profileImage} alt="Profile" />
      </div>
      <div className="profile-info">
        <h1>Jacky Karongkong</h1>
        <h2>Software Developer</h2>
        <div className="buttons">
          <button>RESUME</button>
          <button>CONTACT</button>
        </div>
        <div className="social-links">
          <a
            href="https://www.instagram.com/jcky.kg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagramIcon} alt="Instagram" className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com/pub/dir/Jacky/Karongkong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
          </a>
          <a
            href="https://wa.me/085157809772"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={whatsappIcon} alt="WhatsApp" className="social-icon" />
          </a>
          <a
            href="https://github.com/jackykg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="GitHub" className="social-icon" />
          </a>
        </div>
        <div className="contact-details">
          <p>
            Email:{" "}
            <a href="mailto:j13karongkong@gmail.com">j13karongkong@gmail.com</a>
          </p>
          <p>
            Phone: <a href="tel:+6285157809772">085157809772</a>
          </p>
        </div>
        <div className="buttons">
          <a href={cvPdf} download="Jacky_Karongkong_CV.pdf">
            <button>Download CV</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
