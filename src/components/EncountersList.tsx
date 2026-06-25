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
      className={`flex justify-between border-t border-b border-main-card text-xl text-text-muted transition-all duration-150 hover:bg-accent/10 hover:text-text-main ${isActive && 'bg-accent/10 text-text-main!'}`}
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
    <ul>
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
