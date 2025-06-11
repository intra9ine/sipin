// components/Sidebar.tsx
"use client";

import {
  IoPersonCircleOutline, IoPersonCircle, // Added filled version
  IoLogOutOutline, IoLogOut, // Added filled version
  IoGridOutline, IoGrid, // Added filled version
  IoCloseOutline
} from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiStrategy, PiStrategyFill } from "react-icons/pi"; // Added filled version
import { RiMenuFold4Fill, RiSecurePaymentFill } from "react-icons/ri"; // RiSecurePaymentFill is already filled
import { BiSolidDice4 } from "react-icons/bi"; // BiSolidDice4 is already solid
import { clearLocalStorage } from "@/lib/helper";
import Image from "next/image";


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
    // Each item now has 'icon' (outline/default) and 'activeIcon' (filled/solid)
    { name: "Dashboard", path: "/dashboard", icon: <IoGridOutline className="h-7 w-7" />, activeIcon: <IoGrid className="h-7 w-7" /> },
    { name: "Schemes", path: "/scheme", icon: <PiStrategy className="h-7 w-7" />, activeIcon: <PiStrategyFill className="h-7 w-7" /> },
    // RiSecurePaymentFill and BiSolidDice4 are already filled/solid, so use them for both
    { name: "Payment", path: "/payment", icon: <RiSecurePaymentFill className="h-7 w-7" />, activeIcon: <RiSecurePaymentFill className="h-7 w-7" /> },
    { name: "Bid Management", path: "/companyDetails", icon: <BiSolidDice4 className="h-7 w-7" />, activeIcon: <BiSolidDice4 className="h-7 w-7" /> },
    { name: "Profile", path: "/profile", icon: <IoPersonCircleOutline className="h-7 w-7" />, activeIcon: <IoPersonCircle className="h-7 w-7" /> },
    { name: "Logout", path: "/login", icon: <IoLogOutOutline className="h-7 w-7" />, activeIcon: <IoLogOut className="h-7 w-7" /> },
  ];


  return (
    <aside
      className={`fixed bg-transparent top-0 left-0 shadow-lg bg-gradient-to-t from-[#cd9cf2] to-[#f6f3ff] h-screen sidebar-container bg-white text-black z-50 transition-all duration-300
        ${isMobile
          ? `h-20 transform bottom-0 w-full left-auto top-[100%] ${isOpen ? "translate-y-0" : "-translate-y-full"}`
          : `${isCollapsed ? "w-20" : "w-64"}`
        }`}
    >

      <header className={`${isMobile?'hidden':'flex'} p-4  items-center justify-between h-16`}>
        {!isCollapsed && <section className="flex items-center space-x-2">
          <Image src="/icons/logo.png" width={100} height={100} alt="Logo" className="h-auto" />
        </section>}
        {isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="text-black p-2 hover:bg-white/10 rounded-lg"
            aria-label="Toggle sidebar"
          >
            <RiMenuFold4Fill className="h-6 w-6" />
          </button>
        )}
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

      <nav className={`${isMobile?'flex w-full items-center justify-between pb-4 px-2':'p-4'} flex-1 overflow-y-auto `}>
      <ul className={`${isMobile ? 'flex w-full justify-between items-center pt-4' : 'space-y-4'}`}>
  {menuItems.map((item) => (
    <li key={item.name}>
      {item.name === "Logout" ? (
        <button
          onClick={() => {
            clearLocalStorage(); // or localStorage.removeItem("your_key") if you only want specific keys
            window.location.href = "/login";
          }}
          className={`w-full text-left flex items-center p-2 rounded-md transition-colors duration-200
            ${pathname === item.path ? "bg-[var(--primary-blue-hex)] text-white" : "hover:bg-[var(--lighter-blue-hex)]"}`}
        >
          {pathname === item.path ? item.activeIcon : item.icon}
          {!isCollapsed && (
            <span className={`${isMobile ? 'hidden' : 'block'} ml-3`}>{item.name}</span>
          )}
        </button>
      ) : (
        <Link
          href={item.path}
          className={`flex items-center p-2 rounded-md transition-colors duration-200
            ${pathname === item.path ? "bg-[var(--primary-blue-hex)] text-white" : "hover:bg-[var(--lighter-blue-hex)]"}`}
        >
          {pathname === item.path ? item.activeIcon : item.icon}
          {!isCollapsed && (
            <span className={`${isMobile ? 'hidden' : 'block'} ml-3`}>{item.name}</span>
          )}
        </Link>
      )}
    </li>
  ))}
</ul>

      </nav>
    </aside>
  );
};

export default Sidebar;