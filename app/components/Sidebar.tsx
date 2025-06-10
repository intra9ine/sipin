// Sidebar.tsx
"use client";

import {  IoPersonCircleOutline, IoLogOutOutline, IoGridOutline, IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiStrategy } from "react-icons/pi";
import { RiSecurePaymentFill } from "react-icons/ri";
import {  BiSolidDice4 } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  isCollapsed: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, closeSidebar,toggleSidebar, isCollapsed, isMobile }: SidebarProps) => {
  const pathname = usePathname();

 const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <IoGridOutline className="h-7 w-7" /> },
    { name: "Schemes", path: "/scheme", icon: <PiStrategy className="h-7 w-7" /> },
    { name: "Payment", path: "/payment", icon: <RiSecurePaymentFill className="h-7 w-7" /> },
    { name: "Bid Management", path: "/companyDetails", icon: <BiSolidDice4 className="h-7 w-7" /> },
    { name: "Profile", path: "/profile", icon: <IoPersonCircleOutline className="h-7 w-7" /> },
    { name: "Logout", path: "/logout", icon: <IoLogOutOutline className="h-7 w-7" /> },
  ];


  return (
    <aside
      className={`fixed top-0 left-0 h-screen sidebar-container bg-white text-black z-50 transition-all duration-300
        ${isMobile
          ? `w-64 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`
          : `${isCollapsed ? "w-20" : "w-64"}`
        }`}
    >
     

      <header className="p-4 flex items-center justify-between h-16">
        {!isCollapsed&&<section className="flex items-center space-x-2">
          <img src="/icons/logo.png" alt="Logo" className="h-auto" />
         
        </section>}
        {isCollapsed&& <button
          onClick={toggleSidebar}
          className="text-black p-2 hover:bg-white/10 rounded-lg"
          aria-label="Toggle sidebar"
        >
          <FiMenu className="h-6 w-6" />
        </button>}
        {isMobile && (
          <button
            onClick={closeSidebar}
            className="p-2 rounded-md hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <IoCloseOutline className="h-6 w-6" />
          </button>
        )}
      </header>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center p-2 rounded-md transition-colors duration-200
                  ${pathname === item.path ? "bg-white/20" : "hover:bg-white/10"}`}
                onClick={isMobile ? closeSidebar : undefined}
              >
                {item.icon}
                {(!isCollapsed || isMobile) && (
                  <span className="ml-3">{item.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;