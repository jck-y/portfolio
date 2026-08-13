import React from "react";
import GlassCard from "../GlassCard";
import SectionLabel from "../components/SectionLabel";

const links = [
  {
    label: "j13karongkong@gmail.com",
    href: "mailto:j13karongkong@gmail.com",
    primary: true,
  },
  { label: "WhatsApp", href: "https://wa.me/6285157809772" },
  { label: "Instagram", href: "https://instagram.com/jcky.kg/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jacky-karongkong-70a896293/",
  },
  { label: "GitHub", href: "https://github.com/jck-y" },
];

const ContactPages = () => {
  return (
    <div>
      <SectionLabel>Contact</SectionLabel>

      <GlassCard className="px-6 py-16 md:px-12 md:py-24 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-mist-100 tracking-tightest mb-4">
          Let's build something.
        </h2>
        <p className="text-mist-400 max-w-md mx-auto mb-10 leading-relaxed">
          Open to freelance, full-time, and teaching collaborations. Reach out
          on any channel below.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          {links.map((link, i) =>
            link.primary ? (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default ContactPages;
