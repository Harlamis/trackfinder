import type { MonsterTemplate } from '../types';
import { Healthbar } from './Healthbar';

interface BestiaryListProps {
  monsters: MonsterTemplate[];
  onSelectMonster(id: string | null): void;
  onAddMonster(id: string | null): void;
}

interface BestiaryListItemProps {
  monster: MonsterTemplate;
  onSelect(id: string | null): void;
  onAdd(id: string | null): void;
}

export const BestiaryListItem = ({
  monster,
  onSelect,
  onAdd,
}: BestiaryListItemProps) => {
  return (
    <div className='flex h-auto min-h-20 w-full flex-row bg-main-card px-3 py-2.5'>
      <div
        onClick={() => onSelect(monster.id)}
        className='flex flex-1 cursor-pointer flex-row transition-all hover:bg-accent/5'
      >
        <span className='mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-main-bg font-bold text-accent'>
          {monster.details?.level || '?'}
        </span>
        <div className='flex flex-col'>
          <div className='flex w-full items-center justify-between pr-2'>
            <span className='font-bold text-text-main'>{monster.baseName}</span>
            <span className='rounded border border-border bg-main-bg px-2 py-0.5 text-xs text-text-muted'>
              AC {monster.ac}
            </span>
          </div>
          <Healthbar
            currentHp={monster.maxHp}
            maxHp={monster.maxHp}
            isPlayer={false}
          />
          <div className='flex w-full flex-row flex-wrap gap-1'>
            {monster.details?.traits.map((trait) => (
              <span
                key={trait}
                className='rounded border border-border/60 bg-main-card px-1.5 py-0.5 text-[10px] text-text-muted'
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div
        onClick={() => onAdd(monster.id)}
        className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg text-2xl text-accent transition-all hover:bg-accent/10'
      >
        +
      </div>
    </div>
  );
};

export const BestiaryList = ({
  monsters,
  onSelectMonster,
  onAddMonster,
}: BestiaryListProps) => {
  return (
    <div className='flex h-full w-full flex-col gap-1.5 overflow-y-auto p-2'>
      {monsters.map((mon) => (
        <BestiaryListItem
          key={mon.id}
          monster={mon}
          onAdd={onAddMonster}
          onSelect={onSelectMonster}
        />
      ))}
    </div>
  );
};
