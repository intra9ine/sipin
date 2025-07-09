'use client'
// components/PopupModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Props = {
  title: string;
  maxWidth?:string;
  content: React.ReactNode; // ✅ Accept JSX or components
  onClose: () => void;
};

const PopupModal: React.FC<Props> = ({ title, content,maxWidth, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed  inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`bg-[var(--primary-white-hex)] p-8 relative rounded-[2.5rem] m-5 ${maxWidth?maxWidth:'max-w-xl'}  w-full shadow-xl`}
          initial={{ scale: 0.5, opacity: 0.5, y: -30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0.5, y: 1 }}
          transition={{ duration: 0.35 }}
        >
           <div className=" flex justify-end">
            <button
              className="bg-[var(--primary-green-hex)] absolute top-[-1rem] right-[-1rem] text-[var(--primary-white-hex)] px-3 py-3 rounded-lg hover:bg-[var(--light-green-hex)] "
              onClick={onClose}
            >
            <Image src={'/icons/close.svg'} alt='close' width={100} height={100} className='w-8'/>
            </button>
          </div>
          <h2 className="text-xl font-semibold mb-3">{title}</h2>
          <div className=" text[var(--transparent-black-hex)] whitespace-pre-line">
            {content}
          </div>
         
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopupModal;
