import { useState } from 'react';
import { MobileHeader } from './MobileHeader';
import { Sidebar } from './Sidebar';

export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenMenu = () => setIsSidebarOpen(true);

  const handleCloseMenu = () => setIsSidebarOpen(false);

  return (
    <div className='min-h-screen bg-main-bg md:grid md:grid-cols-12'>
      <MobileHeader onOpenMenu={handleOpenMenu} />
      <Sidebar isOpen={isSidebarOpen} onCloseMenu={handleCloseMenu} />
    </div>
  );
};
