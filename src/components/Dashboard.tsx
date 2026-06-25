import { useState } from 'react';
import { MobileHeader } from './MobileHeader';
import { Sidebar } from './Sidebar';
import type { Encounter } from '../types';

export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [encounters, setEncounters] = useState<Encounter[]>([
    { id: 1, name: 'Tavern Fight', currentRound: 1 },
    { id: 2, name: 'Cave Fight', currentRound: 4 },
    { id: 3, name: 'Dungeon Fight', currentRound: 0 },
  ]);
  const [activeEncounterId, setActiveEncounterId] = useState<number | null>(
    null
  );
  const activeEncounter = encounters.find(
    (enc) => enc.id === activeEncounterId
  );

  const handleOpenMenu = () => setIsSidebarOpen(true);

  const handleCloseMenu = () => setIsSidebarOpen(false);

  return (
    <div className='min-h-screen bg-main-bg md:grid md:grid-cols-12'>
      <MobileHeader isMenuOpen={isSidebarOpen} onOpenMenu={handleOpenMenu} />
      <Sidebar
        isOpen={isSidebarOpen}
        onCloseMenu={handleCloseMenu}
        encounters={encounters}
        activeEncounterId={activeEncounterId}
        onSelectEncounter={setActiveEncounterId}
      />
    </div>
  );
};
