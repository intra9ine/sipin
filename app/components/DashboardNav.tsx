"use client";

import { useEffect, useRef, useState } from "react";
import { IoNotificationsOutline, IoPersonOutline } from "react-icons/io5";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDropdown } from "react-icons/io";

interface DashboardNavProps {
  toggleSidebar: () => void;
  isCollapsed: boolean;
  isMobile: boolean;
}

export default function DashboardNav({ toggleSidebar, isCollapsed, isMobile }: DashboardNavProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`bg-[var(--greyish-white-hex)] shadow-md fixed top-0 right-0 z-40 
      ${isMobile ? "left-0" : `left-20 transition-all duration-300 ${!isCollapsed && "left-64"}`}`}>
      <nav className="flex justify-between items-center h-16 px-4">
       {!isCollapsed&& <button
          onClick={toggleSidebar}
          className="text-[var(--darker-blue-hex)] p-2 hover:bg-white/10 rounded-lg"
          aria-label="Toggle sidebar"
        >
          <FiMenu className="h-6 w-6" />
        </button>}

        <div className={`${isCollapsed?'w-full items-end justify-end':'items-center'} flex  gap-4`}>
          <button className="text-[var(--darker-blue-hex)] p-2 hover:bg-white/10 rounded-lg">
            <IoNotificationsOutline className="h-6 w-6" />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-[var(--darker-blue-hex)] p-2 hover:bg-white/10 rounded-lg flex items-center gap-2"
            >
              <IoPersonOutline className="h-6 w-6" />
              {!isMobile && <IoIosArrowDropdown className="w-4" />}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/logout"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}