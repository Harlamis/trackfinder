import type { SidebarMonsterMetadata } from '../types';

interface RAMonstersListProps {
  monsters: SidebarMonsterMetadata[];
  onSelectMonster(id: number): void;
}

interface RAMonstersListItemProps {
  monster: SidebarMonsterMetadata;
  onSelect(id: number): void;
}

export const RAMonsterListItem = ({
  monster,
  onSelect,
}: RAMonstersListItemProps) => {
  return (
    <li
      onClick={() => onSelect(monster.id)}
      className={`flex justify-between border-t-2 border-b-2 border-border p-2.5 text-xl text-text-muted transition-all duration-300 hover:bg-accent/10 hover:text-text-main`}
    >
      <div>{monster.name}</div>
    </li>
  );
};

export const RAMonstersList = ({
  monsters,
  onSelectMonster,
}: RAMonstersListProps) => {
  return (
    <ul className='flex w-full flex-col gap-2.5'>
      {monsters.map((mon) => (
        <RAMonsterListItem
          key={mon.id}
          monster={mon}
          onSelect={onSelectMonster}
        />
      ))}
    </ul>
  );
};
