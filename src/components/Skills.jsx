import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaJs, FaReact, FaNodeJs, FaPython, FaDatabase, FaJava, FaBriefcase,
  FaHtml5, FaCss3Alt, FaPhp, FaGitAlt, FaGithub, FaBootstrap
} from "react-icons/fa";
import { BiLogoTypescript, BiLogoMongodb } from "react-icons/bi";
import { TbApi, TbBrandSocketIo } from "react-icons/tb";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
        { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
        { name: "JavaScript (ES6+)", icon: <FaJs className="text-[#F7DF1E]" /> },
        { name: "React.js", icon: <FaReact className="text-[#61DAFB]" /> },
        { name: "TypeScript", icon: <BiLogoTypescript className="text-[#3178C6]" /> },
        { name: "Java", icon: <FaJava className="text-[#007396]" /> },
        { name: "Python", icon: <FaPython className="text-[#3776AB]" /> }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
        { name: "Express.js", icon: <FaDatabase className="text-[#000000]" /> },
        { name: "PHP", icon: <FaPhp className="text-[#777BB4]" /> },
        { name: "RESTful API Design", icon: <TbApi className="text-[#009688]" /> }
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "MongoDB", icon: <BiLogoMongodb className="text-[#47A248]" /> },
        { name: "MySQL", icon: <FaDatabase className="text-[#4479A1]" /> }
      ]
    },
    {
      title: "Tools & DevOps",
      skills: [
        { name: "Git", icon: <FaGitAlt className="text-[#F05032]" /> },
        { name: "GitHub", icon: <FaGithub className="text-[#181717]" /> },
        { name: "Vite", icon: <FaJs className="text-[#646CFF]" /> },
        { name: "JWT Authentication", icon: <FaDatabase className="text-[#000000]" /> },
        { name: "WebSockets", icon: <TbBrandSocketIo className="text-[#010101]" /> },
        { name: "Bootstrap", icon: <FaBootstrap className="text-[#7952B3]" /> },
        { name: "Postman", icon: <TbApi className="text-[#FF6C37]" /> }
      ]
    }
  ];

  const [experiences] = useState([
    {
      id: 1,
      company: "RND Technosoft",
      role: "Software Development Intern",
      period: "July 2026 - Present",
      description:
        "Worked on real-world web development projects using modern technologies, contributing to both frontend and backend development. Built responsive user interfaces, integrated REST APIs, and collaborated with the development team to implement new features and resolve bugs. Gained hands-on experience with the MERN stack, version control using Git, database management, and writing clean, maintainable code while following industry best practices.",
      logo: null,
    },
    {
      id: 2,
      company: "TechFellows",
      role: "Freelance Full Stack Developer",
      period: "March 2026 - Present",
      description:
        "Delivered custom web applications and business solutions for clients, handling projects from planning and development to deployment. Built responsive frontend interfaces, developed scalable backend APIs, integrated databases, and implemented authentication and performance optimizations. Collaborated closely with clients to understand requirements, provide technical solutions, and deliver high-quality applications within project deadlines using modern web technologies.",
      logo: null,
    },
    {
      id: 3,
      company: "IBM",
      role: "Web Development Intern",
      period: "1 Month",
      description:
        "Contributed to enterprise-level cloud-based full stack development and AI/ML projects, gaining valuable exposure to agile methodologies and professional software engineering practices.",
      logo: null,
    },
  ]);

  return (
    <div className="mt-3 lg:mt-16" id="skills">
      <div className="px-5 lg:px-28">

        <motion.h2
          className="text-2xl lg:text-4xl text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          My <span className="font-extrabold">Skills</span>
        </motion.h2>

        {/* Categorized Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 lg:mt-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="border-2 border-black rounded-xl p-6 lg:p-8 bg-white hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-extrabold text-xl lg:text-2xl mb-6 pb-2 border-b-2 border-black">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-gray-50 border border-gray-200 hover:border-black rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-pointer"
                  >
                    <span className="text-lg">{skill.icon}</span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Experience Section */}
      <div className="bg-black w-full my-8 py-8 lg:my-16 lg:py-16">
        <motion.h2
          className="text-2xl lg:text-4xl text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          My <span className="font-extrabold">Experience</span>
        </motion.h2>

        {/* Experience Cards */}
        <div className="px-5 lg:px-28 my-8 lg:mt-16 space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="bg-black p-5 border border-[#D4D4D8] rounded-md hover:bg-[#27272A] transition-all cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between flex-col items-start lg:flex-row lg:items-center">
                <div className="flex items-center gap-5">
                  {exp.logo ? (
                    <img className="w-7" src={exp.logo} alt="" />
                  ) : (
                    <FaBriefcase className="text-white w-6 h-6" />
                  )}
                  <h2 className="font-semibold text-white text-lg lg:text-xl">
                    {exp.role} at {exp.company}
                  </h2>
                </div>
                <span className="text-[#D4D4D8] font-semibold text-sm mt-4 lg:mt-0 lg:text-base">
                  {exp.period}
                </span>
              </div>
              <p className="text-[#D4D4D8] mt-6 text-sm/6 lg:text-base font-light">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
