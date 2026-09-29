import React from "react";
import AnimatedBanner2D from "./AnimatedBanner2D";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/jck-y",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jacky-karongkong-70a896293/",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/jcky.kg/",
  },
];

const PortfolioHeader2D = () => {
  return (
    <header className="two-d-profile">
      <div className="two-d-banner-wrap">
        <AnimatedBanner2D />
      </div>

      <div className="two-d-profile-body">
        <div className="two-d-profile-top">
          <div className="two-d-avatar-wrap">
            <img
              src="/images.webp"
              alt="Jacky Karongkong"
              className="two-d-avatar"
            />
          </div>

          <div className="two-d-status">
            <span />
            Available for work
          </div>
        </div>

        <div className="two-d-name-row">
          <div>
            <div className="two-d-name">
              Jacky Karongkong
              <span className="two-d-pink-dot" />
            </div>

            <div className="two-d-username">@jck-y</div>
          </div>
        </div>

        <p className="two-d-bio">
          Building web and mobile applications with React and React Native,
          while integrating practical AI, LLM, and full-stack solutions.
        </p>

        <div className="two-d-meta">
          <span>Software Engineer</span>

          <span>Full-Stack & Mobile</span>

          <span>AI Integration</span>
        </div>

        <div className="two-d-socials">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="two-d-social"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default PortfolioHeader2D;
