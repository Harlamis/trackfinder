import { useState } from 'react';
import type { ActiveMonster } from '../types';
import { Healthbar } from './Healthbar';

interface MonsterInspectorProps {
  monster: ActiveMonster;
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
  const details = monster.details;
  return (
    <div className='flex flex-col gap-4 rounded-b-xl bg-main-card p-1 text-text-main'>
      <div>
        <h3 className='mb-2 text-xl font-bold'>
          {monster.customName || monster.baseName}
        </h3>
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
      {/* Monster Details */}
      {details ? (
        <div className='flex w-full flex-col gap-3 text-2xl text-text-muted'>
          <div className='flex items-center justify-between'>
            <span>
              Level{' '}
              <span className='rounded-xl bg-main-bg px-3 text-text-main'>
                {details.level}
              </span>
            </span>
            <span>{monster.baseName}</span>
          </div>
          <div className='flex w-full flex-col justify-center'>
            <div className='flex items-center gap-2'>
              <span className='text-2xl font-bold tracking-wider text-text-main uppercase'>
                Defences:
              </span>
            </div>
            <div className='grid w-full grid-cols-4 gap-2 p-1'>
              <div className='flex flex-col'>
                <span className='text-text-muted'>AC</span>
                <span className='rounded-md border border-border bg-main-bg px-2 py-0.5 font-medium text-text-main'>
                  {monster.ac}
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='text-text-muted'>FORTITUDE</span>
                <span className='rounded-md border border-border bg-main-bg px-2 py-0.5 font-medium text-text-main'>
                  {details.savingThrows.fortitude}
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='text-text-muted'>WILL</span>
                <span className='rounded-md border border-border bg-main-bg px-2 py-0.5 font-medium text-text-main'>
                  {details.savingThrows.will}
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='text-text-muted'>REFLEX</span>
                <span className='rounded-md border border-border bg-main-bg px-2 py-0.5 font-medium text-text-main'>
                  {details.savingThrows.reflex}
                </span>
              </div>
            </div>
          </div>
          {details?.speed && (
            <div className='flex flex-wrap items-center gap-2 text-lg'>
              <span className='text-2xl font-bold tracking-wider text-text-main uppercase'>
                Speed:
              </span>
              {Object.entries(details.speed)
                .filter(([type, speed]) => speed > 0)
                .map(([type, speed]) => {
                  const label = type === 'walking' ? '' : `${type} `;
                  return (
                    <span
                      key={type}
                      className='rounded-md border border-border bg-main-bg px-2 py-0.5 font-medium text-text-main capitalize'
                    >
                      {label}
                      {speed} ft.
                    </span>
                  );
                })}
            </div>
          )}
        </div>
      ) : (
        <div className='text-sm text-text-muted'>No details available.</div>
      )}
    </div>
  );
};
