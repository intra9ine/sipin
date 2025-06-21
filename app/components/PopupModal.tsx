'use client'
// components/PopupModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineCloseFullscreen } from 'react-icons/md';

type Props = {
  title: string;
  content: React.ReactNode; // ✅ Accept JSX or components
  onClose: () => void;
};

const PopupModal: React.FC<Props> = ({ title, content, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed  inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[var(--primary-white-hex)] p-6 rounded-xl m-5 max-w-xl w-full shadow-xl"
          initial={{ scale: 0.5, opacity: 0.5, y: -30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0.5, y: 1 }}
          transition={{ duration: 0.35 }}
        >
           <div className=" flex justify-end">
            <button
              className="bg-[var(--primary-blue-hex)] text-[var(--primary-white-hex)] px-4 py-2 rounded-lg hover:bg-[var(--light-blue-hex)] "
              onClick={onClose}
            >
              <MdOutlineCloseFullscreen className='text-2xl'/>
            </button>
          </div>
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <div className="text-sm text-gray-700 whitespace-pre-line">
            {content}
          </div>
         
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupModal;
