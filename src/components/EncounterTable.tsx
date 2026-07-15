import { twMerge } from 'tailwind-merge';
import type { Encounter, ActiveMonster } from '../types';
import { Healthbar } from './Healthbar';

interface EncounterTableProps {
  encounter: Encounter;
  activeMonsters: ActiveMonster[];
  selectedMonsterId: number | null;
  onNextTurn(): void;
  onPreviousTurn(): void;
  onSelectMonster(id: number): void;
  onOpenBestiary(): void;
}

interface EncounterTableRowProps {
  monster: ActiveMonster;
  className?: string;
  isSelected: boolean;
  onSelectMonster(id: number): void;
}

const EncounterTableRow = ({
  monster,
  className = '',
  isSelected,
  onSelectMonster,
}: EncounterTableRowProps) => {
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
        <div className='col-span-1'>{monster.init}</div>
        <div className='col-span-5'>
          {monster.customName || monster.baseName}
        </div>
        <div className='col-span-1'>{monster.ac}</div>
      </div>
      <div className='col-span-5'>
        <Healthbar
          currentHp={monster.currentHp}
          maxHp={monster.maxHp}
          isPlayer={monster.isPlayer}
        />
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
}: EncounterTableProps) => {
  return (
    <section className='flex flex-col md:col-span-6'>
      <div className='w-full text-2xl text-text-muted py-2.5'>
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
            className='w-32 rounded-xl bg-accent/50 p-1 text-text-muted text-lg transition-all duration-200 hover:translate-y-0.5 md:block'
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
                  className={
                    isActive ? 'border-l-4 border-accent bg-accent/30' : ''
                  }
                />
              );
            })}
            <button className='hidden md:flex justify-center items-center col-span-12 text-5xl h-10 border border-accent text-accent rounded-lg hover:bg-accent-hover hover:text-text-muted hover:border-0 transition-all duration-300' onClick={onOpenBestiary}>+</button>
        </div>
      </div>
    </section>
  );
};
