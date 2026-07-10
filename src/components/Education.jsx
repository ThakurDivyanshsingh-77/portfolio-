import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaTrophy } from 'react-icons/fa';

export default function Education() {
  const certifications = [
    { name: "Deloitte Cyber Security", link: "https://drive.google.com/file/d/1_cDYeZk7THcTy7EBvsWenjgM-ymYPzPN/view" },
    { name: "IBM Internship", link: "https://drive.google.com/file/d/1VnXCkPNkW9eewVvpgL5btgRi-bgW8qQT/view" },
    { name: "Data Analytics & Business Intelligence", link: "https://drive.google.com/file/d/1WqX_3NpYhArvdr2O7xtjScJOJQcVnXHS/view" },
    { name: "Web Development Internship", link: "https://drive.google.com/file/d/1G-bzZvQ0BNt4gaoqfDX76qAU-37r3-KZ/view" }
  ];

  const achievements = [
    "Won NextGen Techathon Hackathon (April 9, 2026) - secured 1st place among competing teams",
    "Delivered production-grade web features during a 3-month industry internship at Techfellow",
    "Designed, developed, and deployed 4+ full stack applications integrating modern frameworks independently",
    "Awarded Deloitte Data Analysis Certificate, demonstrating strong analytical and data skills",
    "Recognized for debugging proficiency and problem-solving in both academic and internship environments"
  ];

  return (
    <div className="px-5 lg:px-28 py-8 my-8 lg:py-16 lg:my-16" id="education">
      <h2 className="text-2xl lg:text-4xl text-center mb-8 lg:mb-16">
        Education & <span className="font-extrabold">Achievements</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Education & Certifications Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Education Card */}
          <div className="border-2 border-black rounded-xl p-6 lg:p-8 bg-white hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <span className="p-3 bg-black text-white rounded-lg">
                <FaGraduationCap size={24} />
              </span>
              <div>
                <h3 className="font-extrabold text-xl lg:text-2xl">Education</h3>
              </div>
            </div>
            <h4 className="font-bold text-lg text-black mt-2">Bachelor of Computer Applications (BCA)</h4>
            <p className="text-sm font-semibold text-gray-600">CGPA: 7.56 / 10</p>
            <p className="text-gray-500 text-sm mt-1">R.K. Desai Group of Colleges</p>
            <p className="text-gray-400 text-xs">Veer Narmad South Gujarat University (VNSGU), Vapi</p>
            <p className="text-xs text-black font-semibold mt-2 bg-gray-100 w-fit px-2 py-1 rounded">Graduation: May 2026</p>
          </div>

          {/* Certifications Card */}
          <div className="border-2 border-black rounded-xl p-6 lg:p-8 bg-white hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <span className="p-3 bg-black text-white rounded-lg">
                <FaCertificate size={24} />
              </span>
              <div>
                <h3 className="font-extrabold text-xl lg:text-2xl">Certifications</h3>
              </div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {certifications.map((cert, index) => {
                const content = (
                  <>
                    <span className="w-2 h-2 rounded-full bg-black font-bold shrink-0"></span>
                    <span className="truncate">{cert.name}</span>
                  </>
                );

                if (cert.link) {
                  return (
                    <li key={index}>
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[#71717A] hover:text-black hover:border-black transition-all bg-gray-50 p-2 rounded border border-gray-200 font-semibold"
                      >
                        {content}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={index} className="flex items-center gap-2 text-sm text-[#71717A] bg-gray-50 p-2 rounded border border-gray-200">
                    {content}
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>

        {/* Achievements Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-2 border-black rounded-xl p-6 lg:p-8 bg-white hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="p-3 bg-black text-white rounded-lg">
              <FaTrophy size={24} />
            </span>
            <div>
              <h3 className="font-extrabold text-xl lg:text-2xl">Key Achievements</h3>
            </div>
          </div>

          <ul className="space-y-4">
            {achievements.map((ach, index) => {
              const isHackathon = ach.includes("Hackathon");
              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex gap-3 text-sm/6 lg:text-base p-3 rounded-lg transition-all duration-300 ${
                    isHackathon
                      ? "bg-[#FFFDF0] border-2 border-[#EAB308] text-black font-semibold shadow-md transform hover:scale-[1.02]"
                      : "text-[#71717A]"
                  }`}
                >
                  <span className="mt-1 flex items-center justify-center shrink-0">
                    {isHackathon ? "🏆" : "▸"}
                  </span>
                  <span>{ach}</span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
