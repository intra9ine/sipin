'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import DashboardNav from './DashboardNav';
import Loader from './Loader';



const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Only show Sidebar and MainNavbar for routes other than /, /login, and /register
  const showSidebarAndNavbar = pathname !== '/' && pathname !== '/login' && pathname !== '/register';

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      {showSidebarAndNavbar && (
        <>
          <Sidebar
            isOpen={isMobile ? sidebarOpen : true}
            isCollapsed={isCollapsed}
            isMobile={isMobile}
            toggleSidebar={toggleSidebar}
            closeSidebar={() => setSidebarOpen(false)}
          />
          <DashboardNav
            toggleSidebar={toggleSidebar}
            isCollapsed={isCollapsed}
            isMobile={isMobile}
          />
        </>
      )}
      <main
        className={`min-h-screen ${
          showSidebarAndNavbar ? 'pt-16' : ''
        } transition-all duration-300 bg-[var(--lighter-grey-hex)] ${
          showSidebarAndNavbar && !isMobile ? (isCollapsed ? 'ml-20' : 'ml-64') : ''
        }`}
      >
        {loading ? <Loader /> : children}
      </main>
    </>
  );
};

export default AdminLayout;