import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="px-5 lg:px-28 flex justify-between flex-col lg:flex-row" id="about">
      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
        viewport={{ once: true }}
      >
        <img src="/assets/about-me.svg" alt="About Me Illustration" />
      </motion.div>

      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="lg:text-4xl text-2xl mt-4 lg:mt-0">
          About <span className="font-extrabold">Me</span>
        </h2>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-5 lg:mt-10">
          I am a passionate **Full Stack Developer** and a **BCA Graduate** (class of 2026) from R.K. Desai Group of Colleges in Vapi, Gujarat, India. I specialize in building responsive, high-performing web applications using the **MERN stack**, React, Node.js, and modern databases.
        </p>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-5">
          Currently, I am working as a **Software Development Intern at RND Technosoft** and delivering client-focused web solutions as a **Freelance Full Stack Developer at TechFellows**. I have also gained valuable industry experience during my web development internship at **IBM**, working on cloud-based systems and AI/ML integrations.
        </p>

        <p className="text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-5">
          I love participating in competitive events, recently winning **1st place in the NextGen Techathon**, and continuously upgrading my skills through certifications like Deloitte Cyber Security and Data Analytics. I am committed to writing clean, maintainable code and building seamless digital experiences.
        </p>
      </motion.div>
    </div>
  );
}
