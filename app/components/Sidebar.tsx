// components/Sidebar.tsx
"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearLocalStorage } from "@/lib/helper";
import Image from "next/image";
import { menuItems } from "@/lib/constant";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  isCollapsed: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

// Reusable icon loader
const getIcon = (name: string, isActive = false) => (
  <Image
    alt={`${name} icon`}
    src={`/icons/${name}${isActive ? "-hover" : ""}.svg`}
    width={100}
    height={100}
    className="h-6 w-6"
  />
);

const Sidebar = ({ isOpen, isCollapsed, isMobile }: SidebarProps) => {
  const pathname = usePathname();



  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[var(--primary-white-hex)] text-black z-50 transition-all duration-300
        ${isMobile
          ? `h-20 lg:h-20 transform bottom-0 w-full left-auto top-[100%] ${isOpen ? "translate-y-[80%]" : "-translate-y-full"}`
          : `${isCollapsed ? "w-20" : "w-[18rem]"}`
        }`}
    >
      <header className={`${isMobile ? 'hidden' : 'flex'} p-4  w-[14rem] items-center justify-center mt-10 h-20`}>
        {!isCollapsed && (
          <section className="flex items-center">
            <Image src="/icons/logo.svg" width={100} height={100} alt="Logo" className="w-[9rem]" />
          </section>
        )}
       
      </header>

      <nav className={`${isMobile ? 'flex w-full items-center justify-between pb-4 px-2' : 'p-4 '} flex-1 overflow-y-auto`}>
        <ul className={`${isMobile ? 'flex w-full justify-between items-center pt-4' : 'flex flex-col items-center gap-4'}`}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const icon = getIcon(item.iconName, isActive);

            return (
              <li key={item.name}>
                {item.name === "Logout" ? (
                  <button
                    onClick={() => {
                      clearLocalStorage();
                      window.location.href = "/login";
                    }}
                    className={`w-[13rem] lg:w-auto text-left flex items-center justify-start p-4 smxl:p-2 px-5 rounded-[0.8rem] transition-colors duration-200
                      ${isActive ? "bg-[var(--primary-green-hex)] text-white" : "text-[var(--medium-grey-hex)] hover:bg-[var(--lighter-green-hex)]"}`}
                  >
                    {icon}
                    {!isCollapsed && <span className={`${isMobile ? 'hidden' : 'block'} ml-3`}>{item.name}</span>}
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={`w-[13rem] flex items-center lg:w-auto p-4 px-4 smxl:p-2 rounded-[0.8rem] transition-colors duration-200
                      ${isActive ? "bg-[var(--primary-green-hex)] text-white" : "text-[var(--medium-grey-hex)] hover:bg-[var(--lighter-green-hex)]"}`}
                  >
                    {icon}
                    {!isCollapsed && <span className={`${isMobile ? 'hidden' : 'block'} ml-3`}>{item.name}</span>}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
