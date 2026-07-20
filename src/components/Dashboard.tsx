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
import { getRandomInt } from '../Random';
import { encounterService } from '../EncounterService';

const BESTIARY: MonsterTemplate[] = BESTIARY_MOCK;
export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [encounters, setEncounters] = useState<Encounter[]>(ENCOUNTERS_MOCK);

  const [raMonsters] = useState<SidebarMonsterMetadata[]>([
    { id: 'goblin-001', baseName: 'goblin' },
  ]);

  const [activeEncounterId, setActiveEncounterId] = useState<number | null>(
    null
  );

  const [selectedMonsterId, setSelectedMonsterId] = useState<number | null>(
    null
  );

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
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
    setEncounters((prevEncounters) =>
      prevEncounters.map((enc) => {
        if (enc.id !== activeEncounterId) return enc;
        return encounterService.nextTurn(enc);
      })
    );
  };
  const handlePreviousTurn = () => {
    const encounter = encounters.find((enc) => enc.id === activeEncounterId);
    if (!encounter || encounter.monsters.length === 0) return;

    const sorted = encounter.monsters.toSorted((a, b) => b.init - a.init);
    const currentIndex = sorted.findIndex(
      (mon) => mon.id === encounter.activeMonsterId
    );
    if (encounter.currentRound === 1 && currentIndex <= 0) return;

    setEncounters((prevEncounters) =>
      prevEncounters.map((enc) => {
        if (enc.id !== activeEncounterId) return enc;
        return encounterService.previousTurn(enc);
      })
    );
  };

  const handleHealthChange = (amount: number) => {
    if (!selectedMonsterId) return;
    setEncounters((prevEncounters) =>
      prevEncounters.map((enc) => {
        if (enc.id !== activeEncounterId) return enc;
        return {
          ...enc,
          monsters: encounterService.applyHpDelta(
            enc.monsters,
            selectedMonsterId,
            amount
          ),
        };
      })
    );
  };
  const handleBestiaryOpen = () => setPanelMode('bestiary');

  const selectedTemplate = BESTIARY_MOCK.find(
    (t) => t.id === selectedTemplateId
  );

  const fakeActiveMonster: ActiveMonster | null = selectedTemplate
    ? {
        ...selectedTemplate,
        id: -1,
        templateId: selectedTemplate.id,
        maxHp: selectedTemplate.maxHp,
        currentHp: selectedTemplate?.maxHp,
        init: 0,
        isPlayer: false,
      }
    : null;

  const handleAddMonsterToEncounter = (templateId: string | null) => {
    if (!templateId) return;
    const template = BESTIARY.find((t) => t.id === templateId);
    if (!template) return;
    if (activeEncounterId === null) return;

    setEncounters((prevEncounters) => {
      return prevEncounters.map((enc) => {
        if (enc.id !== activeEncounterId) return enc;

        const added = encounterService.addMonster(enc, template);
        const randomInit = getRandomInt(1, 20);
        return {
          ...added,
          monsters: added.monsters.map((mon, index, list) =>
            index === list.length - 1 ? { ...mon, init: randomInit } : mon
          ),
        };
      });
    });
  };

  const handleAddEncounter = () => {
    const allIds = encounters.map((enc) => enc.id);
    const maxId = allIds.length > 0 ? Math.max(...allIds) : 0;
    const newId = maxId + 1;
    setEncounters((prevEncounters) => {
      const newEncounter: Encounter = {
        id: newId,
        name: `Encounter ${newId}`,
        currentRound: 1,
        activeMonsterId: null,
        monsters: [],
      };
      return [...prevEncounters, newEncounter];
    });
    setActiveEncounterId(newId);
  };

  const handleDeleteEncounter = (id: number) => {
    setEncounters((prevEncounters) =>
      prevEncounters.filter((enc) => enc.id !== id)
    );
    if (id === activeEncounterId) setActiveEncounterId(null);
  };

  const handleRenameEncounter = (id: number, newName: string) => {
    if (id == null || newName.trim() === '') return;
    setEncounters((prevEncounters) => {
      return prevEncounters.map((enc) => {
        if (enc.id !== id) return enc;
        return { ...enc, name: newName };
      });
    });
  };

  const handleUpdateMonster = (
    monsterId: number,
    changes: Partial<ActiveMonster>
  ) => {
    setEncounters((prevEncounters) =>
      prevEncounters.map((enc) => {
        if (enc.id !== activeEncounterId) return enc;
        return {
          ...enc,
          monsters: encounterService.updateMonster(
            enc.monsters,
            monsterId,
            changes
          ),
        };
      })
    );
  };

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
        onAddEncounter={handleAddEncounter}
        onDeleteEncounter={handleDeleteEncounter}
        onRenameEncounter={handleRenameEncounter}
      />
      {activeEncounter ? (
        <EncounterTable
          encounter={activeEncounter}
          onNextTurn={handleNextTurn}
          activeMonsters={hydratedMonsters}
          onPreviousTurn={handlePreviousTurn}
          selectedMonsterId={selectedMonsterId}
          onSelectMonster={handleMonsterSelect}
          onOpenBestiary={handleBestiaryOpen}
          onUpdateMonster={handleUpdateMonster}
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
        onUpdateMonster={handleUpdateMonster}
        onClosePanel={() => setPanelMode('closed')}
        previewMonster={fakeActiveMonster}
        onSelectTemplateId={setSelectedTemplateId}
        onAddMonster={handleAddMonsterToEncounter}
      />
    </div>
  );
};
