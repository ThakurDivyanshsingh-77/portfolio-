import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Toast Notification Component
 * Display temporary notifications for user feedback
 */
export default function Toast({ message, type = 'success', isVisible, onClose }) {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const bgColor =
    type === 'success'
      ? 'bg-green-500'
      : type === 'error'
        ? 'bg-red-500'
        : 'bg-blue-500';

  const icon =
    type === 'success'
      ? '✓'
      : type === 'error'
        ? '✕'
        : 'ℹ';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-5 right-5 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50`}
        >
          <span className='text-xl font-bold'>{icon}</span>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
