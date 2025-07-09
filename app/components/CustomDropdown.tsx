'use client'
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const CustomDropdown = ({ value, options, onChange }: { value: string, options: string[], onChange: (v: string) => void }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    return (
      <div ref={dropdownRef} className="relative w-full ">
        <button
          onClick={() => setOpen(!open)}
          className={`w-full text-left px-2 py-2 rounded-lg   bg-white shadow-sm focus:outline-none flex items-center justify-between ${
            value === 'Pending' ? 'bg-[#FFDEDE] text-[#F70000]' :
            value === 'Completed' ? 'bg-[#DCFCE7] text-[#3CD856]' :
            value === 'Failed' ? 'bg-[#FFF4DE] text-[#FF947A]' :
            value === 'Refunded' ? 'bg-[#F3E8FF] text-[var(--primary-blue-hex)]' : 'text-gray-800'}
          `}
        >
             
         <span> {value || 'Select...'}</span>
         <FaChevronDown className="ml-2 text-sm" />
        </button>
        {open && (
          <div className="absolute top-full left-0  z-10 w-full mt-1 rounded-lg border bg-white shadow-lg">
            {options.map((opt, idx) => (
              <div
              key={idx}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-4 py-2 border-b last:border-b-0 cursor-pointer ${
                opt === value
                  ? 'bg-[var(--primary-blue-hex)] text-white'
                  : 'text-[var(--primary-blue-hex)] hover:bg-gray-100'
              }`}
            >
              {opt}
            </div>
            
            ))}
          </div>
        )}
      </div>
    );
  };


  export default CustomDropdown