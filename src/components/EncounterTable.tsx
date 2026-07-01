import { twMerge } from 'tailwind-merge';
import type {
  Encounter,
  CombatMonster,
  Monster,
  ActiveMonster,
} from '../types';
import { Healthbar } from './Healthbar';

interface EncounterTableProps {
  encounter: Encounter;
  activeMonsters: ActiveMonster[];
  onNextTurn(): void;
  onPreviousTurn(): void;
}

interface EncounterTableRowProps {
  monster: ActiveMonster;
  className?: string;
}

const EncounterTableRow = ({
  monster,
  className = '',
}: EncounterTableRowProps) => {
  return (
    <div
      className={twMerge(
        'flex flex-col gap-3 rounded-lg bg-main-card p-4 md:grid md:grid-cols-12 md:gap-4 md:bg-transparent md:px-4 md:py-2 md:text-text-main',
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
}: EncounterTableProps) => {
  return (
    <section className='flex flex-col md:col-span-6'>
      <div className='w-full text-2xl text-text-muted'>
        <div className='flex w-full items-center justify-around'>
          <button
            onClick={onPreviousTurn}
            className='hidden w-32 rounded-xl bg-accent/50 p-1 text-lg text-text-muted transition-all duration-200 hover:translate-y-0.5 md:block'
          >
            &lt;&lt;Previous Turn
          </button>
          <h2 className='text-center'>Round: {encounter.currentRound}</h2>
          <button
            onClick={onNextTurn}
            className='hidden w-32 rounded-xl bg-accent p-1 text-text-main transition-all duration-200 hover:translate-y-0.5 md:block'
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
                  className={
                    isActive ? 'border-l-4 border-accent bg-accent/30' : ''
                  }
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};
