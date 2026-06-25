import type { Encounter } from '../types';

interface EncountersListItemProps {
  encounter: Encounter;
  isActive: boolean;
  onSelect(id: number): void;
}

export const EncountersListItem = ({
  encounter,
  isActive,
  onSelect,
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
}

export const EncountersList = ({
  encounters,
  activeEncounterId,
  onSelectActive,
}: EncountersListProps) => {
  return (
    <ul className='flex w-full flex-col gap-2.5'>
      {encounters.map((enc) => (
        <EncountersListItem
          key={enc.id}
          encounter={enc}
          isActive={enc.id === activeEncounterId}
          onSelect={onSelectActive}
        />
      ))}
    </ul>
  );
};
