import React from "react";

const links = [
  {
    label: "Email",
    value: "j13karongkong@gmail.com",
    href: "mailto:j13karongkong@gmail.com",
  },
  {
    label: "WhatsApp",
    value: "+6285157809772",
    href: "https://wa.me/6285157809772",
  },
  {
    label: "LinkedIn",
    value: "jackykarongkong",
    href: "https://linkedin.com/in/jackykarongkong/",
  },
  {
    label: "GitHub",
    value: "jck-y",
    href: "https://github.com/jck-y",
  },
];

const Contact2D = () => {
  return (
    <div className="two-d-contact">
      <div className="two-d-contact-copy">
        <span className="two-d-small-label">OPEN TO</span>

        <h3>
          Let's build
          <em> something.</em>
        </h3>

        <p>
          Open for work, collaborations, software projects, and interesting
          technical challenges.
        </p>
      </div>

      <div className="two-d-contact-links">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
          >
            <span>{link.label}</span>

            <strong>{link.value}</strong>

            <span>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact2D;
