import { useState } from "react";
import { MobileHeader } from "./MobileHeader";

export const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleOpenMenu = () => setIsSidebarOpen(true);

  return (
    <div className="min-h-screen bg-main-bg md:grid md:grid-cols-12">
      <MobileHeader onOpenMenu={handleOpenMenu}/>
    </div>
  );
};
