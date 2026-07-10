import React from 'react';
import { TbExternalLink } from "react-icons/tb";
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Alumni Connect",
    description: "Full stack alumni networking platform with JWT auth, profile management, advanced search filters, and admin moderation panel.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    image: "/assets/alumni_connect.png",
    link: "https://connect-alpha-green.vercel.app/"
  },
  {
    id: 2,
    title: "Smart Attendance Management System",
    description: "Secure attendance system with one-time session codes, role-based dashboards (Admin/Teacher/Student), and realtime tracking.",
    technologies: ["Angular", "Node.js", "MongoDB", "JWT"],
    image: "/assets/attendance_system.png",
    link: "#"
  },
  {
    id: 3,
    title: "Collaborative Code Editor",
    description: "Multi-user coding environment using Monaco Editor with live cursor sync, presence tracking, and real-time chat via WebSockets.",
    technologies: ["React", "TypeScript", "Vite", "Node.js", "WebSockets", "MongoDB"],
    image: "/assets/code_together.png",
    link: "https://codetogether18.netlify.app/"
  },
  {
    id: 4,
    title: "Workflow Automation System",
    description: "Visual no-code automation platform inspired by n8n, with drag-and-drop node-based pipeline builder for designing workflows.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    image: "/assets/workflow_automation.png",
    link: "#"
  }
];

export default function Projects() {
  return (
    <div className="bg-black px-5 lg:px-28 py-8 my-8 lg:py-16 lg:my-16" id="projects">
      <h2 className="text-2xl lg:text-4xl text-center text-white">
        My <span className="font-extrabold">Projects</span>
      </h2>

      <div className="lg:mt-16 mt-8 lg:space-y-16 space-y-8 lg:pb-6 pb-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className={`flex justify-between items-center flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 10, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="lg:w-[500px] w-full rounded-2xl overflow-hidden">
              <img
                className="w-full h-full hover:scale-105 transition-all duration-500 cursor-pointer object-cover"
                src={project.image}
                alt={project.title}
              />
            </div>

            <div className="lg:w-1/2 lg:space-y-6 space-y-4">
              <h2 className="font-extrabold text-white mt-5 lg:mt-0 text-3xl lg:text-5xl">
                {String(project.id).padStart(2, "0")}
              </h2>
              <p className="font-bold text-white text-xl lg:text-3xl">{project.title}</p>

              <p className="font-light text-sm/6 lg:text-base text-[#71717A]">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-[#27272A] text-white text-xs px-3 py-1 rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              <a href={project.link} className="text-white mt-3 block w-fit" target="_blank" rel="noopener noreferrer">
                <TbExternalLink size={23} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
