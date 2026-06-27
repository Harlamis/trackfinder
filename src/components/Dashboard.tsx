import { useState } from 'react';
import { MobileHeader } from './MobileHeader';
import { Sidebar } from './Sidebar';
import { type Encounter } from '../types';
import type { SidebarMonsterMetadata } from '../types';
import { EncounterTable } from './EncounterTable';

const INITIAL_ENCOUNTERS: Encounter[] = [
  {
    id: 1,
    name: 'Ambush on the High Road',
    currentRound: 1,
    activeMonsterId: 101,
    monsters: [
      {
        id: 101,
        name: 'Tordin (Paladin)',
        maxHp: 25,
        currentHp: 20,
        ac: 18,
        init: 18,
        isPlayer: true,
      },
      {
        id: 102,
        name: 'Goblin Archer A',
        maxHp: 12,
        currentHp: 12,
        ac: 13,
        init: 15,
        isPlayer: false,
      },
      {
        id: 103,
        name: 'Goblin Boss',
        maxHp: 30,
        currentHp: 24,
        ac: 15,
        init: 11,
        isPlayer: false,
      },
      {
        id: 104,
        name: 'Elyon (Ranger)',
        maxHp: 18,
        currentHp: 14,
        ac: 16,
        init: 6,
        isPlayer: true,
      },
    ],
  },
  {
    id: 2,
    name: "Ogre's Den",
    currentRound: 3,
    activeMonsterId: 105,
    monsters: [
      {
        id: 105,
        name: 'Cave Ogre',
        maxHp: 59,
        currentHp: 20,
        ac: 12,
        init: 8,
        isPlayer: false,
      },
      {
        id: 101,
        name: 'Tordin (Paladin)',
        maxHp: 25,
        currentHp: 25,
        ac: 18,
        init: 14,
        isPlayer: true,
      },
    ],
  },
  {
    id: 3,
    name: 'Empty Encounter Test',
    currentRound: 1,
    activeMonsterId: null,
    monsters: [],
  },
];

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
