import type { Encounter, Monster } from '../types';
import { Healthbar } from './Healthbar';

interface EncounterTableProps {
  encounter: Encounter;
}

interface EncounterTableRowProps {
  monster: Monster;
}

const EncounterTableRow = ({ monster }: EncounterTableRowProps) => {
  return (
    <div className='flex flex-col gap-3 rounded-lg bg-main-card p-4 md:grid md:grid-cols-12 md:gap-4 md:bg-transparent md:px-4 md:py-2 md:text-text-main'>
      <div className='flex items-center justify-between md:contents'>
        <div className='col-span-1'>{monster.init}</div>
        <div className='col-span-5'>{monster.name}</div>
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

export const EncounterTable = ({ encounter }: EncounterTableProps) => {
  return (
    <section className='flex flex-col md:col-span-6'>
      <div className='w-full text-2xl text-text-muted'>
        <h2 className='w-full text-center'>Round: {encounter.currentRound}</h2>
        <div className='flex flex-col gap-5'>
          <div className='hidden grid-cols-12 gap-4 px-4 py-2 text-text-main md:grid'>
            <div className='col-span-1'>Init</div>
            <div className='col-span-5'>Name</div>
            <div className='col-span-1'>AC</div>
            <div className='col-span-5'>HP</div>
          </div>
          {encounter.monsters
            .toSorted((a, b) => b.init - a.init)
            .map((mon) => (
              <EncounterTableRow monster={mon} key={mon.id} />
            ))}
        </div>
      </div>
    </section>
  );
};
