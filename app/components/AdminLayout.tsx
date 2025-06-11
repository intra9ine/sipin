'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import DashboardNav from './DashboardNav';
import Loader from './Loader';
import { useResponsive } from '@/hooks/useResponsive'; // adjust path accordingly

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { isMobile, isDesktop, hasMounted } = useResponsive();

  const showSidebarAndNavbar =
    pathname !== '/' && pathname !== '/login' && pathname !== '/register';

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  if (!hasMounted) return null;

  return (
    <main className="bg-[var(--primary-white-hex)] min-h-screen">
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
        className={`transition-all duration-300 ${
          showSidebarAndNavbar ? 'pt-16' : ''
        } ${showSidebarAndNavbar && isDesktop ? (isCollapsed ? 'ml-20' : 'ml-64') : ''}`}
      >
        {loading ? <Loader /> : children}
      </main>
    </main>
  );
};

export default AdminLayout