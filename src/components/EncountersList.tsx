import type { Encounter } from '../types';
import AddCrossIcon from '../assets/add-cross.svg';

interface EncountersListItemProps {
  encounter: Encounter;
  isActive: boolean;
  onSelect(id: number): void;
  onAdd(): void;
  onDelete(id: number): void;
  onRename(id: number, newName: string): void;
}

export const EncountersListItem = ({
  encounter,
  isActive,
  onSelect,
  onRename,
  onDelete,
}: EncountersListItemProps) => {
  return (
    <li
      onClick={() => onSelect(encounter.id)}
      className={`flex justify-between border-t-2 border-b-2 border-border p-2.5 text-xl text-text-muted transition-all duration-300 hover:bg-accent/10 hover:text-text-main ${isActive && 'bg-accent/10 text-text-main!'}`}
    >
      <div>{encounter.name}</div>
      <div>{encounter.currentRound}</div>
    </li>
  );
};

interface EncountersListProps {
  encounters: Encounter[];
  activeEncounterId: number | null;
  onSelectActive(id: number): void;
  onAdd(): void;
  onDeleteEncounter(id: number): void;
  onRenameEncounter(id: number, newName: string): void;
}

export const EncountersList = ({
  encounters,
  activeEncounterId,
  onSelectActive,
  onAdd,
  onDeleteEncounter,
  onRenameEncounter,
}: EncountersListProps) => {
  return (
    <ul className='flex w-full flex-col gap-2.5'>
      {encounters.map((enc) => (
        <EncountersListItem
          key={enc.id}
          encounter={enc}
          isActive={enc.id === activeEncounterId}
          onSelect={onSelectActive}
          onAdd={onAdd}
          onDelete={onDeleteEncounter}
          onRename={onRenameEncounter}
        />
      ))}
      <button
        className='flex items-center justify-center rounded-md border-2 border-accent p-2.5 hover:bg-accent/70'
        onClick={onAdd}
      >
        <img src={AddCrossIcon} alt='Add Encounter' />
      </button>
    </ul>
  );
};
