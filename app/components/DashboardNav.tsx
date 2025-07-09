"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { clearLocalStorage, getEncryptedLocalStorageItem } from "@/lib/helper";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { menuItems, USER_NAME } from "@/lib/constant";

interface DashboardNavProps {
  toggleSidebar: () => void;
  isCollapsed: boolean;
  isMobile: boolean;
}

export default function DashboardNav({  isCollapsed, isMobile }: DashboardNavProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userName = getEncryptedLocalStorageItem(USER_NAME);
const pathname=usePathname()
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTitleByPath=useMemo(()=>{
  return menuItems.find((item)=>item.path==pathname)?.title
  },[pathname])
  return (
    <header className={`bg-[var(--primary-white-hex)]   
      ${isMobile ? "left-0" : `left-[18rem] w-full fixed transition-all duration-300 `}`}>
      <nav className="flex justify-between items-center h-[5rem]  px-4 pt-5">
     

        <div className={`${isCollapsed?'w-full items-end justify-end':'w-10/12 xl:w-3/4 xlgm:w-[70%]  lg:w-full items-start justify-between'} flex  gap-4`}>
        <h1 className="text-4xl sm:text-3xl smxl:text-2xl text-[var(--primary-black-hex)] font-semibold">
    {getTitleByPath || "Dashboard"}
  </h1>
         
          <main className="flex gap-3 justify-between items-center lg:hidden">
          <button  className=" bg-[var(--light-orange-hex)] p-2 rounded-lg lg:hidden">
          <Image src={'/icons/notification.svg'} alt="notification" width={100} height={100} className="w-6" />
          </button>
            {!userName ?<div className="w-[3rem] h-[3rem] bg-[var(--primary-blue-hex)] text-[var(--primary-white-hex)]  rounded-[0.6rem] flex items-center justify-center">S</div>:<div className="w-[3rem] h-[3rem] bg-[var(--primary-blue-hex)] text-[var(--primary-white-hex)]  rounded-[0.6rem] flex items-center justify-center">{userName.charAt(0)}</div>}
            {userName?(
              <main className="flex flex-col items-start justify-start">
                <h1>{userName}</h1>
                <h1 className="text-xs text-[var(--medium-grey-hex)]">user</h1>
              </main>
            ):(<main className="flex flex-col items-start justify-start">
              <h1>User Name</h1>
              <h1 className="text-xs text-[var(--medium-grey-hex)]">user</h1>
            </main>)}
          <button
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="p-2 relative bg-green w-[4rem] hover:bg-white/10 rounded-lg flex items-center gap-2"
    >
      <Image src={'/icons/dropdown.svg'} alt="dropdown" width={100} height={100} className="w-[1.2rem]" />
    </button>
    </main>
 
   

    {isDropdownOpen && (
      <div className="absolute lg:hidden right-[20rem] mt-12 w-[10rem] bg-white rounded-md shadow-lg py-1">
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
          onClick={() => {
            clearLocalStorage();
            setIsDropdownOpen(false);
          }}
        >
          Logout
        </Link>
      </div>
    )}


          {isMobile &&<section className="flex items-center ">
          <Image width={100} height={100} src="/icons/logo.svg" alt="Logo" className="h-auto w-[7rem]" />
        </section>}
   

        </div>
      </nav>
    </header>
  );
}