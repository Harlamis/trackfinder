import { useEffect, useMemo, useState } from 'react';
import { MobileHeader } from './MobileHeader';
import { Sidebar } from './Sidebar';
import type {
  PanelMode,
  MonsterTemplate,
  ActiveMonster,
  EncounterDto,
} from '../types';
import { EncounterTable } from './EncounterTable';
import { MonsterPanel } from './MonsterPanel';
import { encounterService } from '../EncounterService';
import { BestiaryService } from '../BestiaryService';
import { encounterApi } from '../api/encounterApi';

export const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [encounters, setEncounters] = useState<EncounterDto[]>([]);
  const [templates, setTemplates] = useState<MonsterTemplate[]>([]);
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

  type HydratedEncounter = Omit<EncounterDto, 'monsters'> & {
    monsters: ActiveMonster[];
  };

  const activeEncounterHydrated = useMemo<HydratedEncounter | null>(() => {
    if (!activeEncounter) return null;
    return {
      ...activeEncounter,
      monsters: BestiaryService.hydrateMonsters(
        activeEncounter.monsters,
        templates
      ),
    };
  }, [activeEncounter, templates]);

  const hydratedMonsters = activeEncounterHydrated?.monsters ?? [];

  const selectedMonster =
    hydratedMonsters.find((mon) => mon.id === selectedMonsterId) || null;

  const [panelMode, setPanelMode] = useState<PanelMode>('bestiary');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, loadedTemplates] = await Promise.all([
          encounterApi.getAll(),
          BestiaryService.loadTemplates(),
        ]);
        setEncounters(data);
        setTemplates(loadedTemplates);
      } catch (e) {
        console.error('Could not fetch encounters or templates', e);
      }
    };
    fetchData();
  }, []);

  const handleOpenMenu = () => setIsSidebarOpen(true);

  const handleCloseMenu = () => setIsSidebarOpen(false);

  const handleMonsterSelect = (id: number) => {
    setSelectedMonsterId(id);
    setPanelMode('inspector');
  };

  const handleNextTurn = async () => {
    if (!activeEncounterHydrated) return;

    const updatedEncounter = encounterService.nextTurn(activeEncounterHydrated);
    await encounterApi.update({
      id: updatedEncounter.id,
      activeMonsterId: updatedEncounter.activeMonsterId,
      currentRound: updatedEncounter.currentRound,
    });
    setEncounters((prevEncounters) =>
      prevEncounters.map((enc) =>
        enc.id !== activeEncounterId
          ? enc
          : {
              ...enc,
              activeMonsterId: updatedEncounter.activeMonsterId,
              currentRound: updatedEncounter.currentRound,
            }
      )
    );
  };

  const handlePreviousTurn = async () => {
    if (!activeEncounterHydrated) return;

    const updatedEncounter = encounterService.previousTurn(
      activeEncounterHydrated
    );
    await encounterApi.update({
      id: updatedEncounter.id,
      activeMonsterId: updatedEncounter.activeMonsterId,
      currentRound: updatedEncounter.currentRound,
    });
    setEncounters((prevEncounters) =>
      prevEncounters.map((enc) =>
        enc.id !== activeEncounterId
          ? enc
          : {
              ...enc,
              activeMonsterId: updatedEncounter.activeMonsterId,
              currentRound: updatedEncounter.currentRound,
            }
      )
    );
  };

  const handleHealthChange = async (amount: number) => {
    if (!selectedMonsterId) return;
    if (!activeEncounter) return;

    const updatedMonsters = await encounterService.applyHpDelta(
      activeEncounter.monsters,
      selectedMonsterId,
      amount
    );

    setEncounters((prevEncounters) =>
      prevEncounters.map((enc) => {
        if (enc.id !== activeEncounterId) return enc;
        return {
          ...enc,
          monsters: updatedMonsters,
        };
      })
    );
  };
  const handleBestiaryOpen = () => setPanelMode('bestiary');

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

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

  const handleAddMonsterToEncounter = async (templateId: string | null) => {
    if (!templateId) return;
    if (!activeEncounterId) return;

    const newMonster = await encounterService.addMonster(
      activeEncounterId,
      templateId
    );

    setEncounters((prevEncounters) =>
      prevEncounters.map((enc) =>
        enc.id !== activeEncounterId
          ? enc
          : { ...enc, monsters: [...enc.monsters, newMonster] }
      )
    );
  };

  const handleAddEncounter = async () => {
    const newEnc = await encounterService.createEncounter('New Encounter');
    setEncounters((prev) => [...prev, newEnc]);
    setActiveEncounterId(newEnc.id);
  };

  const handleDeleteEncounter = async (id: number) => {
    await encounterApi.delete(id);
    setEncounters((prevEncounters) =>
      prevEncounters.filter((enc) => enc.id !== id)
    );
    if (id === activeEncounterId) setActiveEncounterId(null);
  };

  const handleRenameEncounter = async (id: number, newName: string) => {
    if (id == null || newName.trim() === '') return;
    await encounterApi.update({ id, name: newName });
    setEncounters((prevEncounters) =>
      prevEncounters.map((enc) =>
        enc.id !== id ? enc : { ...enc, name: newName }
      )
    );
  };

  const handleUpdateMonster = async (
    monsterId: number,
    changes: Partial<ActiveMonster>
  ) => {
    if (!activeEncounter) return;
    const updatedMonsters = await encounterService.updateMonster(
      activeEncounter.monsters,
      monsterId,
      changes
    );
    setEncounters((prevEncounters) =>
      prevEncounters.map((enc) => {
        if (enc.id !== activeEncounterId) return enc;
        return {
          ...enc,
          monsters: updatedMonsters,
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
        onAddEncounter={handleAddEncounter}
        onDeleteEncounter={handleDeleteEncounter}
        onRenameEncounter={handleRenameEncounter}
      />
      {activeEncounterHydrated ? (
        <EncounterTable
          encounter={activeEncounterHydrated}
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
        templates={templates}
        onSelectTemplateId={setSelectedTemplateId}
        onAddMonster={handleAddMonsterToEncounter}
      />
    </div>
  );
};
