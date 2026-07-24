import React from "react";
import GlassCard from "../GlassCard";

const AboutMe = () => {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-6">
        <span className="w-4 h-px bg-violet-300" />
        <span className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-300">
          About
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-8 md:p-10 md:col-span-2">
          <h2 className="text-2xl md:text-[1.7rem] font-semibold text-white tracking-tight mb-5 leading-snug">
            Full-stack engineer with a teaching habit
          </h2>
          <p className="text-[15.5px] leading-relaxed text-gray-400">
            I'm a Computer Science graduate (Magna Cum Laude, GPA 3.82) from
            Universitas Klabat, working across mobile apps, web platforms, and
            applied AI. I've shipped a React Native news app with 10,000+
            downloads, built a stunting-risk tracking tool used for real health
            evaluations, and integrated LLM chatbots into production. Alongside
            building, I've mentored 500+ students in programming and currently
            teach Machine Learning and Generative AI to high schoolers.
          </p>
        </GlassCard>

        <GlassCard className="p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="text-4xl font-bold text-white tracking-tight">
              500+
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Students mentored in Computer Programming
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white tracking-tight">
              10K+
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Downloads on a shipped React Native app
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AboutMe;
