import type { Encounter } from '../types';
import AddCrossIcon from '../assets/add-cross.svg';
import PencilIcon from '../assets/pencil.svg';
import TrashIcon from '../assets/trashcan.svg';

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
      className={`flex justify-between items-center border-t-2 border-b-2 border-border p-2.5 text-xl text-text-muted transition-all duration-300 hover:bg-accent/10 hover:text-text-main ${isActive && 'bg-accent/10 text-text-main!'}`}
    >
      <div>{encounter.name}</div>
      <div>{encounter.currentRound}</div>
      <div className='flex gap-2'>
        <button
          className='rounded p-2 transition-colors duration-200 hover:bg-accent/20'
          title='Edit encounter name'
          onClick={(e) => {
            e.stopPropagation();
            const newName = prompt(
              'Please enter new name of the Encounter',
              encounter.name
            );

            if (newName) onRename(encounter.id, newName);
          }}
        >
          <img src={PencilIcon} alt='edit' className='h-6 w-6' />
        </button>
        <button
          className='rounded p-2 transition-colors duration-200 hover:bg-accent/20'
          title='Delete encounter'
          onClick={(e) => {
            e.stopPropagation();
            if (confirm(`Are you sure you want to delete ${encounter.name}?`))
              onDelete(encounter.id);
          }}
        >
          <img src={TrashIcon} alt='delete' className='h-6 w-6' />
        </button>
      </div>
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
