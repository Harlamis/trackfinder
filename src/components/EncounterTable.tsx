import { twMerge } from 'tailwind-merge';
import type { EncounterDto, ActiveMonsterView } from '../types';
import { Healthbar } from './Healthbar';
import { useState } from 'react';

interface EncounterTableProps {
  encounter: Pick<EncounterDto, 'currentRound' | 'activeMonsterId'>;
  activeMonsters: ActiveMonsterView[];
  selectedMonsterId: number | null;
  onNextTurn(): void;
  onPreviousTurn(): void;
  onSelectMonster(id: number): void;
  onOpenBestiary(): void;
  onUpdateMonster(monsterId: number, changes: Partial<ActiveMonsterView>): void;
}

interface EncounterTableRowProps {
  monster: ActiveMonsterView;
  className?: string;
  isSelected: boolean;
  onSelectMonster(id: number): void;
  onUpdateMonster(monsterId: number, changes: Partial<ActiveMonsterView>): void;
}

const EncounterTableRow = ({
  monster,
  className = '',
  isSelected,
  onSelectMonster,
  onUpdateMonster,
}: EncounterTableRowProps) => {
  const [isEditingInit, setIsEditingInit] = useState(false);
  const [tempValue, setTempValue] = useState('');

  const inputClasses =
    'w-full rounded-lg border border-border bg-main-bg px-3 py-2 text-sm text-text-main placeholder-text-muted focus:border-accent focus:outline-none';

  const commitInitChange = () => {
    const newInit = Number(tempValue);
    if (!Number.isNaN(newInit)) {
      onUpdateMonster(monster.id, { init: newInit });
    }
    setIsEditingInit(false);
    setTempValue('');
  };

  return (
    <div
      onClick={() => onSelectMonster(monster.id)}
      className={twMerge(
        'flex flex-col gap-3 rounded-lg bg-main-card p-4 hover:bg-accent/10 md:grid md:grid-cols-12 md:gap-4 md:bg-transparent md:px-4 md:py-2 md:text-text-main',
        isSelected ? 'border-2 border-accent bg-accent/20' : '',
        className
      )}
    >
      <div className='flex items-center justify-between md:contents'>
        {isEditingInit ? (
          <input
            type='number'
            placeholder={String(monster.init)}
            value={tempValue}
            autoFocus={true}
            className={inputClasses + ' col-span-1'}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={commitInitChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitInitChange();
            }}
          />
        ) : (
          <div
            className='col-span-1 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setTempValue(String(monster.init));
              setIsEditingInit(true);
            }}
          >
            {monster.init}
          </div>
        )}

        <div className='col-span-5'>
          {monster.customName || monster.baseName}
        </div>

        <div className='col-span-1'>{monster.ac}</div>
      </div>

      <div className='col-span-5 flex items-center'>
        <div className='w-full'>
          <Healthbar
            currentHp={monster.currentHp}
            maxHp={monster.maxHp}
            isPlayer={monster.isPlayer}
          />
        </div>
      </div>
    </div>
  );
};

export const EncounterTable = ({
  encounter,
  activeMonsters,
  onNextTurn,
  onPreviousTurn,
  onSelectMonster,
  selectedMonsterId,
  onOpenBestiary,
  onUpdateMonster,
}: EncounterTableProps) => {
  return (
    <section className='flex flex-col md:col-span-6'>
      <div className='w-full py-2.5 text-2xl text-text-muted'>
        <div className='flex w-full items-center justify-around'>
          <button
            onClick={onPreviousTurn}
            className='w-32 rounded-xl bg-accent/50 p-1 text-lg text-text-muted transition-all duration-200 hover:translate-y-0.5 md:block'
          >
            &lt;&lt;Previous Turn
          </button>
          <h2 className='text-center'>Round: {encounter.currentRound}</h2>
          <button
            onClick={onNextTurn}
            className='w-32 rounded-xl bg-accent/50 p-1 text-lg text-text-muted transition-all duration-200 hover:translate-y-0.5 md:block'
          >
            Next Turn &gt;&gt;
          </button>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='hidden grid-cols-12 gap-4 px-4 py-2 text-text-main md:grid'>
            <div className='col-span-1'>Init</div>
            <div className='col-span-5'>Name</div>
            <div className='col-span-1'>AC</div>
            <div className='col-span-5'>HP</div>
          </div>
          {activeMonsters
            .toSorted((a, b) => b.init - a.init)
            .map((mon) => {
              const isActive = encounter.activeMonsterId === mon.id;
              return (
                <EncounterTableRow
                  monster={mon}
                  key={mon.id}
                  onSelectMonster={onSelectMonster}
                  isSelected={mon.id === selectedMonsterId}
                  onUpdateMonster={onUpdateMonster}
                  className={
                    isActive ? 'border-l-4 border-accent bg-accent/30' : ''
                  }
                />
              );
            })}
          <button
            className='col-span-12 hidden h-10 items-center justify-center rounded-lg border border-accent text-5xl text-accent transition-all duration-300 hover:border-0 hover:bg-accent-hover hover:text-text-muted md:flex'
            onClick={onOpenBestiary}
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
};
