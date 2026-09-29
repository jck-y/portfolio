import React from "react";
import GlassCard from "../GlassCard";
import SectionLabel from "../components/SectionLabel";

const AboutMe = () => {
  return (
    <div>
      <SectionLabel>About</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        <GlassCard className="p-8 md:p-10 lg:p-12 md:col-span-2">
          <h3>
            Software Engineer
            <em> building full-stack products with AI.</em>
          </h3>

          <p>
            I'm a Computer Science graduate with hands-on experience building
            and deploying web and mobile applications using React, React Native,
            Laravel, and Python.
          </p>

          <p>
            My work spans full-stack development, database integration, mobile
            applications, and practical AI/LLM integration. I also have
            experience teaching programming, Machine Learning, NLP, and
            Generative AI.
          </p>
        </GlassCard>

        <GlassCard className="p-8 md:p-10 flex flex-col justify-between gap-8">
          <div>
            <div className="font-display text-5xl md:text-[3.4rem] font-medium text-ink-950">
              500+
            </div>
            <div className="text-sm text-ink-500 mt-2">
              Students mentored in Computer Programming
            </div>
          </div>
          <div className="pt-6 border-t border-paper-300">
            <div className="font-display text-5xl md:text-[3.4rem] font-medium text-ink-950">
              10K+
            </div>
            <div className="text-sm text-ink-500 mt-2">
              Downloads on Manado Post app, with 100+ user active
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AboutMe;
