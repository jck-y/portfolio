import React from "react";
import GlassCard from "../GlassCard";
import SectionLabel from "../components/SectionLabel";

const AboutMe = () => {
  return (
    <div>
      <SectionLabel>About</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        <GlassCard className="p-8 md:p-10 lg:p-12 md:col-span-2">
          <h2 className="font-display text-2xl md:text-[2rem] font-semibold text-mist-100 tracking-tight mb-6 leading-snug">
            Full-stack engineer with a teaching habit
          </h2>
          <p className="text-[15px] leading-[1.85] text-mist-400">
            I'm a Computer Science graduate (Magna Cum Laude, GPA 3.82) from
            Universitas Klabat, specializing in mobile apps, web platforms, and
            applied AI. I've shipped a React Native news app with 10.000+
            downloads, built a stunting-risk tracking tool used for real health
            evaluations, and integrated LLM chatbots into production
            applications. Alongside building scalable solutions using
            AI-assisted workflows, I've mentored 500+ students in programming
            and currently teach Machine Learning and Generative AI to high
            schoolers.
          </p>
        </GlassCard>

        <GlassCard className="p-8 md:p-10 flex flex-col justify-between gap-8">
          <div>
            <div className="font-display text-5xl md:text-[3.4rem] font-semibold tracking-tightest text-mist-100">
              500+
            </div>
            <div className="text-sm text-mist-500 mt-2">
              Students mentored in Computer Programming
            </div>
          </div>
          <div className="pt-6 border-t border-white/[0.07]">
            <div className="font-display text-5xl md:text-[3.4rem] font-semibold tracking-tightest text-mist-100">
              10K+
            </div>
            <div className="text-sm text-mist-500 mt-2">
              Downloads on Manado Post app, with 100+ user active
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AboutMe;
