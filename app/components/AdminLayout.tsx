'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import DashboardNav from './DashboardNav';
import Loader from './Loader';
import { useResponsive } from '@/hooks/useResponsive';
import { getEncryptedLocalStorageItem } from '@/lib/helper'; // ensure correct path
import { TOKEN_VALUE } from '@/lib/constant';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { isMobile, isDesktop, hasMounted } = useResponsive();

  const showSidebarAndNavbar =
    pathname !== '/' && pathname !== '/login' && pathname !== '/register';

  // ⛔️ Redirect to login if no token
  useEffect(() => {
    const token = getEncryptedLocalStorageItem(TOKEN_VALUE);
    if (!token && pathname !== '/login' && pathname !== '/register') {
      router.push('/login');
    }
  }, [pathname]);

  // Loader delay
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
        className={`transition-all duration-300 overflow-hidden ${
          showSidebarAndNavbar ? 'pt-16' : ''
        } ${showSidebarAndNavbar && isDesktop ? (isCollapsed ? 'ml-20' : 'ml-64') : ''}`}
      >
        {loading ? <Loader /> : children}
      </main>
    </main>
  );
};

export default AdminLayout;
