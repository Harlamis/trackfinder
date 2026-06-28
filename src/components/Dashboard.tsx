import { useState } from 'react';
import { MobileHeader } from './MobileHeader';
import { Sidebar } from './Sidebar';
import type { PanelMode, Encounter } from '../types';
import type { SidebarMonsterMetadata } from '../types';
import { EncounterTable } from './EncounterTable';
import { INITIAL_ENCOUNTERS } from '../MockData';

export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [encounters, setEncounters] = useState<Encounter[]>(INITIAL_ENCOUNTERS);

  const [raMonsters, setRaMonsters] = useState<SidebarMonsterMetadata[]>([
    { id: 1, name: 'goblin' },
  ]);

  const [activeEncounterId, setActiveEncounterId] = useState<number | null>(
    null
  );

  const activeEncounter = encounters.find(
    (enc) => enc.id === activeEncounterId
  );

  const [panelMode, setPanelMode] = useState<PanelMode>('bestiary');

  const [selectedMonsterId, setSelectedMonsterId] = useState<number | null>(
    null
  );

  const handleOpenMenu = () => setIsSidebarOpen(true);

  const handleCloseMenu = () => setIsSidebarOpen(false);

  const handleNextTurn = () => {
    const encounter = encounters.find((enc) => enc.id === activeEncounterId);
    if (!encounter || encounter.monsters.length == 0) return;
    const sorted = encounter.monsters.toSorted((a, b) => b.init - a.init);
    const currentIndex = sorted.findIndex(
      (mon) => mon.id === encounter.activeMonsterId
    );
    let nextIndex = currentIndex + 1;
    let currentRound;
    if (nextIndex >= sorted.length) {
      currentRound = encounter.currentRound + 1;
      nextIndex = 0;
    } else {
      currentRound = encounter.currentRound;
    }

    const nextMonsterId = sorted[nextIndex].id;

    setEncounters((prevEncounters) =>
      prevEncounters.map((enc) => {
        if (enc.id !== activeEncounterId) return enc;
        return {
          ...enc,
          currentRound: currentRound,
          activeMonsterId: nextMonsterId,
        };
      })
    );
  };
  const handlePreviousTurn = () => {
    const encounter = encounters.find((enc) => enc.id === activeEncounterId);
    if (!encounter || encounter.monsters.length == 0) return;
    const sorted = encounter.monsters.toSorted((a, b) => b.init - a.init);
    const currentIndex = sorted.findIndex(
      (mon) => mon.id === encounter.activeMonsterId
    );
    if (encounter.currentRound === 1 && currentIndex <= 0) return;
    let nextIndex = currentIndex - 1;
    let currentRound;
    if (nextIndex < 0) {
      if (encounter.currentRound <= 0) return;
      currentRound = encounter.currentRound - 1;
      nextIndex = sorted.length - 1;
    } else {
      currentRound = encounter.currentRound;
    }

    const nextMonsterId = sorted[nextIndex].id;

    setEncounters((prevEncounters) =>
      prevEncounters.map((enc) => {
        if (enc.id !== activeEncounterId) return enc;
        return {
          ...enc,
          currentRound: currentRound,
          activeMonsterId: nextMonsterId,
        };
      })
    );
  };

  const handleHealthChange = (amount: number) => {
    if (!selectedMonsterId) return;
    setEncounters((prevEncounters) => {
      return prevEncounters.map((enc) => {
        if (enc.id !== activeEncounterId) return enc;

        return {
          ...enc,
          monsters: enc.monsters.map((mon) => {
            if (mon.id !== selectedMonsterId) return mon;
            const newHp = Math.min(
              mon.maxHp,
              Math.max(0, mon.currentHp + amount)
            );
            return { ...mon, currentHp: newHp };
          }),
        };
      });
    });
  };

  return (
    <div className='min-h-screen bg-main-bg md:grid md:grid-cols-12'>
      <MobileHeader isMenuOpen={isSidebarOpen} onOpenMenu={handleOpenMenu} />
      <Sidebar
        isOpen={isSidebarOpen}
        onCloseMenu={handleCloseMenu}
        encounters={encounters}
        activeEncounterId={activeEncounterId}
        onSelectEncounter={setActiveEncounterId}
        monsters={raMonsters}
        onSelectMonster={() => false}
      />
      {activeEncounter ? (
        <EncounterTable
          encounter={activeEncounter}
          onNextTurn={handleNextTurn}
          onPreviousTurn={handlePreviousTurn}
        />
      ) : (
        <div className='flex items-center justify-center text-text-muted md:col-span-6'>
          <p>
            Please select an encounter from the sidebar to start the combat.
          </p>
        </div>
      )}
    </div>
  );
};
