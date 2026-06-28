import { useState } from 'react';
import type { Monster } from '../types';
import { Healthbar } from './Healthbar';

interface MonsterInspectorProps {
  monster: Monster;
  onHealthChange(amount: number): void;
}

export const MonsterInspector = ({
  monster,
  onHealthChange,
}: MonsterInspectorProps) => {
  const [customHealth, setCustomHealth] = useState<number | ''>('');

  const handleCustomSubmit = (multiplier: 1 | -1) => {
    if (!customHealth) return;
    onHealthChange(multiplier * customHealth);
    setCustomHealth('');
  };
  return (
    <div className='flex flex-col gap-4 rounded-b-xl bg-main-card p-4 text-text-main'>
      <div>
        <h3 className='mb-2 text-xl font-bold'>{monster.name}</h3>
        <Healthbar
          currentHp={monster.currentHp}
          maxHp={monster.maxHp}
          isPlayer={monster.isPlayer}
        />
      </div>
      <div className='mt-2 flex flex-col gap-4'>
        <div className='grid grid-cols-4 gap-2'>
          <button
            className='rounded-lg bg-danger py-2 text-center font-bold text-text-main transition-all duration-200 hover:translate-y-1'
            onClick={() => onHealthChange(-10)}
          >
            -10
          </button>
          <button
            className='rounded-lg bg-danger py-2 text-center font-bold text-text-main transition-all duration-200 hover:translate-y-1'
            onClick={() => onHealthChange(-5)}
          >
            -5
          </button>
          <button
            className='rounded-lg bg-danger py-2 text-center font-bold text-text-main transition-all duration-200 hover:translate-y-1'
            onClick={() => onHealthChange(-1)}
          >
            -1
          </button>
          <input
            type='number'
            placeholder='Enter value'
            onChange={(e) =>
              setCustomHealth(e.target.value ? Number(e.target.value) : '')
            }
            className='w-full rounded-lg border border-border bg-main-bg text-center text-sm text-text-main placeholder-text-muted focus:border-accent focus:outline-none'
          />
        </div>
        <div className='grid grid-cols-4 gap-4'>
          <button
            className='rounded-lg bg-success py-2 text-center font-bold text-text-main transition-all duration-200 hover:translate-y-1'
            onClick={() => onHealthChange(10)}
          >
            +10
          </button>
          <button
            className='rounded-lg bg-success py-2 text-center font-bold text-text-main transition-all duration-200 hover:translate-y-1'
            onClick={() => onHealthChange(5)}
          >
            +5
          </button>
          <button
            className='rounded-lg bg-success py-2 text-center font-bold text-text-main transition-all duration-200 hover:translate-y-1'
            onClick={() => onHealthChange(1)}
          >
            +1
          </button>

          <div className='grid grid-cols-2 gap-1'>
            <button
              className='rounded-lg bg-danger py-2 text-center font-bold text-text-main transition-all duration-200 hover:translate-y-1'
              onClick={() => handleCustomSubmit(-1)}
            >
              -
            </button>
            <button
              className='rounded-lg bg-success py-2 text-center font-bold text-text-main transition-all duration-200 hover:translate-y-1'
              onClick={() => handleCustomSubmit(1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
