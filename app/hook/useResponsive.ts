import { useEffect, useState } from 'react';

type ScreenSize = 'mobile' | 'tablet' | 'desktop';

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>('desktop');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 896) {
        setScreenSize('mobile');
      } else if (width < 896) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize(); // Run initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hasMounted]);

  return {
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop',
    screenSize,
    hasMounted,
  };
};
