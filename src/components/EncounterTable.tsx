import { twMerge } from 'tailwind-merge';
import type { Encounter, ActiveMonster } from '../types';
import PencilIcon from '../assets/pencil.svg';
import { Healthbar } from './Healthbar';
import { useState } from 'react';

interface EncounterTableProps {
  encounter: Encounter;
  activeMonsters: ActiveMonster[];
  selectedMonsterId: number | null;
  onNextTurn(): void;
  onPreviousTurn(): void;
  onSelectMonster(id: number): void;
  onOpenBestiary(): void;
  onUpdateMonster(monsterId: number, changes: Partial<ActiveMonster>): void;
}

interface EncounterTableRowProps {
  monster: ActiveMonster;
  className?: string;
  isSelected: boolean;
  onSelectMonster(id: number): void;
  onUpdateMonster(monsterId: number, changes: Partial<ActiveMonster>): void;
}

const EncounterTableRow = ({
  monster,
  className = '',
  isSelected,
  onSelectMonster,
  onUpdateMonster,
}: EncounterTableRowProps) => {
  const [editingField, setEditingField] = useState<
    'init' | 'ac' | 'name' | 'maxHp' | null
  >(null);
  const [tempValue, setTempValue] = useState('');

  const inputClasses =
    'w-full rounded-lg border border-border bg-main-bg px-3 py-2 text-sm text-text-main placeholder-text-muted focus:border-accent focus:outline-none';

  const commitChanges = () => {
    if (!editingField) return;

    if (editingField === 'name') {
      const trimmed = tempValue.trim();
      onUpdateMonster(monster.id, {
        customName: trimmed === '' ? undefined : trimmed,
      });
    } else {
      const newValue = Number(tempValue);
      if (!Number.isNaN(newValue)) {
        if (editingField === 'init')
          onUpdateMonster(monster.id, { init: newValue });
        if (editingField === 'ac')
          onUpdateMonster(monster.id, { ac: newValue });
        if (editingField === 'maxHp')
          onUpdateMonster(monster.id, { maxHp: newValue });
      }
    }

    setEditingField(null);
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
        {editingField === 'init' ? (
          <input
            type='number'
            placeholder={String(monster.init)}
            value={tempValue}
            autoFocus={true}
            className={inputClasses + ' col-span-1'}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={commitChanges}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitChanges();
            }}
          />
        ) : (
          <div
            className='col-span-1 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setTempValue(String(monster.init));
              setEditingField('init');
            }}
          >
            {monster.init}
          </div>
        )}

        {editingField === 'name' ? (
          <input
            type='text'
            placeholder={monster.customName || monster.baseName}
            value={tempValue}
            autoFocus={true}
            className={inputClasses + ' col-span-5'}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={commitChanges}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitChanges();
            }}
          />
        ) : (
          <div
            className='col-span-5 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setTempValue(monster.customName ?? monster.baseName);
              setEditingField('name');
            }}
          >
            {monster.customName || monster.baseName}
          </div>
        )}

        {editingField === 'ac' ? (
          <input
            type='number'
            placeholder={String(monster.ac)}
            value={tempValue}
            autoFocus={true}
            className={inputClasses + ' col-span-1'}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={commitChanges}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitChanges();
            }}
          />
        ) : (
          <div
            className='col-span-1 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setTempValue(String(monster.ac));
              setEditingField('ac');
            }}
          >
            {monster.ac}
          </div>
        )}
      </div>

      <div className='col-span-5 flex flex-col gap-2'>
        {editingField === 'maxHp' ? (
          <>
            <div className='text-xs text-text-muted'>Editing max HP</div>
            <input
              type='number'
              placeholder={String(monster.maxHp)}
              value={tempValue}
              autoFocus={true}
              className={inputClasses}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={commitChanges}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitChanges();
              }}
            />
          </>
        ) : (
          <div
            className='group relative cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setTempValue(String(monster.maxHp));
              setEditingField('maxHp');
            }}
          >
            <Healthbar
              currentHp={monster.currentHp}
              maxHp={monster.maxHp}
              isPlayer={monster.isPlayer}
            />
            <span className='pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1 rounded-full bg-main-bg/90 px-2 py-0.5 text-[10px] text-text-muted opacity-90 transition-opacity duration-200 group-hover:opacity-100'>
              <img src={PencilIcon} alt='Edit max HP' className='h-3 w-3' />
              Edit
            </span>
          </div>
        )}
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
