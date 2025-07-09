'use client';
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const StatusDropdown = ({
  value,
  options,
  onChange,
  defaultTitle
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  defaultTitle:string;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-[15rem]  bg-transparent ">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-3 py-2 focus:outline-none flex items-center justify-between   bg-transparent  underline underline-offset-[0.5rem] text-[var(--primary-blue-hex)]"
      >
        <span>{value||defaultTitle}</span>
        <FaChevronDown className="ml-2 text-sm" />
      </button>

      {open && (
        <div
          style={{ zIndex: 21 }}
          className="absolute top-full left-0 w-full mt-1 rounded-lg border bg-white shadow-lg"
        >
          {/* Placeholder: clicking this sends empty string */}
          <div
            onClick={() => {
              onChange(""); // pass "" to API
              setOpen(false);
            }}
            className={`px-4 py-2 border-b cursor-pointer ${
              value === ""
                ? "bg-[var(--primary-blue-hex)] text-white"
                : "text-gray-400 hover:bg-gray-100"
            }`}
          >
{defaultTitle}
          </div>

          {options.map((opt, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-4 py-2 border-b last:border-b-0 cursor-pointer ${
                opt === value
                  ? "bg-[var(--primary-blue-hex)] text-white"
                  : "text-[var(--primary-blue-hex)] hover:bg-gray-100"
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

export default StatusDropdown;
