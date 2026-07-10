import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import axios from 'axios';
import Toast from './Toast';
import { BiLogoGmail } from 'react-icons/bi';
import { BsGithub } from 'react-icons/bs';
import { IoLogoLinkedin, IoLogoTwitter } from 'react-icons/io5';
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/contact';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: '',
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success',
  });

  /**
   * Handle form input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Show toast notification
   */
  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
  };

  /**
   * Hide toast notification
   */
  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  /**
   * Reset form data
   */
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      website: '',
      message: '',
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim all fields
    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      website: formData.website.trim(),
      message: formData.message.trim(),
    };

    // Client-side validation
    if (!trimmedData.name) {
      showToast('Please enter your name', 'error');
      return;
    }

    if (!trimmedData.email) {
      showToast('Please enter your email', 'error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedData.email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    if (!trimmedData.message) {
      showToast('Please enter your message', 'error');
      return;
    }

    if (trimmedData.message.length < 10) {
      showToast('Message must be at least 10 characters', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(API_URL, trimmedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      if (response.data.success) {
        showToast('Message sent successfully! I will get back to you soon.', 'success');
        resetForm();
      } else {
        showToast(response.data.message || 'Failed to send message', 'error');
      }
    } catch (error) {
      console.error('Contact form error:', error);

      if (error.response) {
        showToast(error.response.data?.message || 'Failed to send message', 'error');
      } else if (error.request) {
        showToast('Network error. Please check your connection.', 'error');
      } else {
        showToast('An error occurred. Please try again.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className='lg:my-16 lg:px-28 my-8 px-5'
      id='contact'
    >
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className='text-2xl lg:text-4xl text-center'
      >
        Contact <span className='font-extrabold'>Me</span>
      </motion.h2>

      <div className='flex justify-between items-center mt-8 lg:mt-16 flex-col lg:flex-row'>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className='lg:w-[40%]'
        >
          <form className='w-full space-y-3 lg:space-y-5' onSubmit={handleSubmit}>
            <input
              className='border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full disabled:bg-gray-100 disabled:cursor-not-allowed'
              type="text"
              name="name"
              placeholder='Your name'
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
            <input
              className='border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full disabled:bg-gray-100 disabled:cursor-not-allowed'
              type="email"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
            <input
              className='border-2 px-5 py-3 border-black rounded placeholder:text-[#71717A] text-sm w-full disabled:bg-gray-100 disabled:cursor-not-allowed'
              type="text"
              name="website"
              placeholder='Your website (If exists)'
              value={formData.website}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <textarea
              className='resize-none border-2 px-5 py-3 h-32 border-black placeholder:text-[#71717A] rounded text-sm w-full disabled:bg-gray-100 disabled:cursor-not-allowed'
              name="message"
              placeholder='How can I help?*'
              value={formData.message}
              onChange={handleInputChange}
              disabled={isLoading}
            ></textarea>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
              className='flex justify-between gap-3 lg:gap-5 flex-col lg:flex-row'
            >
              <motion.button
                whileHover={isLoading ? {} : { scale: 1.05 }}
                type='submit'
                disabled={isLoading}
                className='bg-black justify-center w-fit lg:w-auto lg:flex-1 hover:shadow-lg text-white px-3 py-2 rounded flex items-center gap-x-3 font-medium disabled:opacity-70 disabled:cursor-not-allowed transition-all'
              >
                {isLoading ? (
                  <>
                    <span className='inline-block animate-spin'>⏳</span>
                    Sending...
                  </>
                ) : (
                  'Get In Touch'
                )}
              </motion.button>

              <div className='flex items-center gap-x-2 lg:gap-x-5'>
                {[
                  { Icon: BiLogoGmail, url: "mailto:divyanshthakur.2251@gmail.com" },
                  { Icon: IoLogoLinkedin, url: "https://www.linkedin.com/in/divyansh-singh-1162bb333/" },
                  { Icon: IoLogoTwitter, url: "https://x.com/singhDivyansh77" },
                  { Icon: BsGithub, url: "https://github.com/ThakurDivyanshsingh-77" }
                ].map(({ Icon, url }, index) => (
                  <motion.a
                    key={index}
                    href={url}
                    target={url.startsWith("mailto:") ? undefined : "_blank"}
                    rel={url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="bg-white p-2 lg:p-3 rounded border-2 border-black"
                    whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </form>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className='lg:w-1/2'
        >
          <div className='font-extrabold text-2xl lg:text-5xl mt-5 lg:mt-0 space-y-1 lg:space-y-3'>
            <h2>Let's <span className='text-white' style={{ WebkitTextStroke: '1px black' }}>talk</span> for</h2>
            <h2>Something special</h2>
          </div>

          <p className='text-[#71717A] text-sm/6 lg:text-base mt-3 lg:mt-6'>I seek to push the limits of creativity to create high-engaging, user-friendly, and memorable interactive experiences.</p>

          <div className='font-semibold text-sm lg:text-xl flex flex-col mt-6 gap-2 lg:gap-4'>
            <motion.a
              whileHover={{ x: 5 }}
              className='flex items-center gap-2 group'
              href="mailto:divyanshthakur.2251@gmail.com"
            >
              <span className='border-2 transition-all border-transparent group-hover:border-black rounded-full p-1'>
                <IoMdMail className="w-4 h-4 lg:w-5 lg:h-5" />
              </span>
              divyanshthakur.2251@gmail.com
            </motion.a>

            <motion.a
              whileHover={{ x: 5 }}
              className='flex items-center gap-2 group'
              href="tele:7709280916"
            >
              <span className='border-2 transition-all border-transparent group-hover:border-black rounded-full p-[5px]'>
                <FaPhone className="w-3 h-3 lg:w-4 lg:h-4" />
              </span>
              7709280916
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={hideToast}
      />
    </motion.div>
  );
}
