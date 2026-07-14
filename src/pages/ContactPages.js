import React from "react";
import GlassCard from "../GlassCard";

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
      <div className="flex items-center gap-2.5 mb-6">
        <span className="w-4 h-px bg-violet-300" />
        <span className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-300">
          Contact
        </span>
      </div>

      <GlassCard className="px-8 py-16 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight">
          Let's build something.
        </h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Open to freelance, full-time, and teaching collaborations. Reach out
          on any channel below.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                link.primary
                  ? "px-6 py-3 rounded-2xl text-sm font-semibold bg-gradient-to-br from-indigo-400 to-violet-400 text-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(108,108,244,0.4)] transition-all"
                  : "px-6 py-3 rounded-2xl text-sm font-semibold border border-white/[0.1] bg-white/[0.03] text-white hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all"
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default ContactPages;
