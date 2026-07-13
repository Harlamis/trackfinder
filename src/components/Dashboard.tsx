import { useMemo, useState } from 'react';
import { MobileHeader } from './MobileHeader';
import { Sidebar } from './Sidebar';
import type {
  PanelMode,
  Encounter,
  MonsterTemplate,
  ActiveMonster,
} from '../types';
import type { SidebarMonsterMetadata } from '../types';
import { EncounterTable } from './EncounterTable';
import { ENCOUNTERS_MOCK, BESTIARY_MOCK } from '../MockData';
import { MonsterPanel } from './MonsterPanel';

const BESTIARY: MonsterTemplate[] = BESTIARY_MOCK;
export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [encounters, setEncounters] = useState<Encounter[]>(ENCOUNTERS_MOCK);

  const [raMonsters, setRaMonsters] = useState<SidebarMonsterMetadata[]>([
    { id: 'goblin-001', baseName: 'goblin' },
  ]);

  const [activeEncounterId, setActiveEncounterId] = useState<number | null>(
    null
  );

  const [selectedMonsterId, setSelectedMonsterId] = useState<number | null>(
    null
  );

  const activeEncounter = encounters.find(
    (enc) => enc.id === activeEncounterId
  );

  const hydratedMonsters: ActiveMonster[] = useMemo(() => {
    return (
      activeEncounter?.monsters.map((mon) => {
        const template = BESTIARY.find((base) => base.id === mon.templateId);

        if (!template)
          throw new Error(`Error: cannot find template for: ${mon.templateId}`);

        return { ...template, ...mon } as ActiveMonster;
      }) ?? []
    );
  }, [activeEncounter]);

  const selectedMonster =
    hydratedMonsters.find((mon) => mon.id === selectedMonsterId) || null;

  const [panelMode, setPanelMode] = useState<PanelMode>('bestiary');

  const handleOpenMenu = () => setIsSidebarOpen(true);

  const handleCloseMenu = () => setIsSidebarOpen(false);

  const handleMonsterSelect = (id: number) => {
    setSelectedMonsterId(id);
    setPanelMode('inspector');
  };

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
  const handleBestiaryOpen = () => setPanelMode('bestiary');

  return (
    <div className='min-h-screen bg-main-bg md:grid md:grid-cols-12'>
      <MobileHeader
        isMenuOpen={isSidebarOpen}
        onOpenMenu={handleOpenMenu}
        onOpenBestiary={handleBestiaryOpen}
      />
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
          activeMonsters={hydratedMonsters}
          onPreviousTurn={handlePreviousTurn}
          selectedMonsterId={selectedMonsterId}
          onSelectMonster={handleMonsterSelect}
        />
      ) : (
        <div className='flex items-center justify-center text-text-muted md:col-span-6'>
          <p>
            Please select an encounter from the sidebar to start the combat.
          </p>
        </div>
      )}
      <MonsterPanel
        panelMode={panelMode}
        activeMonster={selectedMonster}
        onHealthChange={handleHealthChange}
        onClosePanel={() => setPanelMode('closed')}
      />
    </div>
  );
};
