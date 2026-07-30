import { useState } from 'react';
import type { ActiveMonsterView, MonsterTemplate } from '../types';
import { Healthbar } from './Healthbar';

type MonsterInspectorMonster = ActiveMonsterView | MonsterTemplate;

interface MonsterInspectorProps {
  monster: MonsterInspectorMonster;
  onHealthChange(amount: number): void;
  onUpdateMonster(monsterId: number, changes: Partial<ActiveMonsterView>): void;
  isEditable?: boolean;
}

export const MonsterInspector = ({
  monster,
  onHealthChange,
  onUpdateMonster,
  isEditable = true,
}: MonsterInspectorProps) => {
  const isActiveMonster = 'currentHp' in monster;
  const [customHealth, setCustomHealth] = useState<number | ''>('');
  const [nameInput, setNameInput] = useState(
    'customName' in monster && monster.customName
      ? monster.customName
      : monster.baseName
  );
  const [acInput, setAcInput] = useState(String(monster.ac));
  const [maxHpInput, setMaxHpInput] = useState(String(monster.maxHp));

  const inputClasses =
    'w-full rounded-lg border border-border bg-main-bg px-3 py-2 text-sm text-text-main placeholder-text-muted focus:border-accent focus:outline-none';

  const commitNameChange = () => {
    if (!isActiveMonster) return;
    onUpdateMonster(monster.id, {
      customName: nameInput.trim() || undefined,
    });
  };

  const commitAcChange = () => {
    if (!isActiveMonster) return;
    const acValue = Number(acInput);
    if (!Number.isNaN(acValue)) {
      onUpdateMonster(monster.id, { ac: acValue });
    }
  };

  const commitMaxHpChange = () => {
    if (!isActiveMonster) return;
    const maxHpValue = Number(maxHpInput);
    if (!Number.isNaN(maxHpValue)) {
      onUpdateMonster(monster.id, { maxHp: maxHpValue });
    }
  };

  const handleCustomSubmit = (multiplier: 1 | -1) => {
    if (!customHealth) return;
    onHealthChange(multiplier * customHealth);
    setCustomHealth('');
  };
  const details = monster.details as MonsterTemplate['details'] | undefined;
  const currentHp = isActiveMonster ? monster.currentHp : monster.maxHp;
  return (
    <div className='flex flex-col gap-4 rounded-b-xl bg-main-card p-1 text-text-main'>
      <div className='flex flex-col gap-3'>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
          <div className='flex flex-col gap-1'>
            <label className='text-sm text-text-muted'>Name</label>
            <input
              type='text'
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onBlur={isEditable ? commitNameChange : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && isEditable) commitNameChange();
              }}
              disabled={!isEditable}
              className={`${inputClasses} ${!isEditable ? 'cursor-not-allowed opacity-70' : ''}`}
            />
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-text-muted'>AC</label>
              <input
                type='number'
                value={acInput}
                onChange={(e) => setAcInput(e.target.value)}
                onBlur={isEditable ? commitAcChange : undefined}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isEditable) commitAcChange();
                }}
                disabled={!isEditable}
                className={`${inputClasses} ${!isEditable ? 'cursor-not-allowed opacity-70' : ''}`}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-sm text-text-muted'>Max HP</label>
              <input
                type='number'
                value={maxHpInput}
                onChange={(e) => setMaxHpInput(e.target.value)}
                onBlur={isEditable ? commitMaxHpChange : undefined}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isEditable) commitMaxHpChange();
                }}
                disabled={!isEditable}
                className={`${inputClasses} ${!isEditable ? 'cursor-not-allowed opacity-70' : ''}`}
              />
            </div>
          </div>
        </div>

        <div>
          <Healthbar
            currentHp={currentHp}
            maxHp={monster.maxHp}
            isPlayer={Boolean(isActiveMonster && monster.isPlayer)}
          />
        </div>
      </div>
      {isEditable && isActiveMonster && (
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
      )}
      {/* Monster Details */}
      {details ? (
        <div className='flex w-full flex-col gap-3 text-2xl text-text-muted'>
          <div className='flex items-center justify-between'>
            <span>
              Level{' '}
              <span className='rounded-lg border border-border bg-main-bg px-3 text-text-main'>
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
                <span className='text-text-muted'>FORT</span>
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
          {details.speed && (
            <div className='flex flex-wrap items-center gap-2 text-lg'>
              <span className='text-2xl font-bold tracking-wider text-text-main uppercase'>
                Speed:
              </span>
              {Object.entries(details.speed)
                .filter(([, speed]) => speed > 0)
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
          {details.attacks && details.attacks.length > 0 && (
            <div className='flex flex-col gap-2'>
              <span className='text-xs font-bold tracking-wider text-text-muted uppercase'>
                Strikes:
              </span>
              <div className='flex flex-col gap-2'>
                {details.attacks.map((attack, index) => {
                  const formattedBonus =
                    attack.bonus >= 0 ? `+${attack.bonus}` : attack.bonus;

                  return (
                    <div
                      key={`${attack.name}-${index}`}
                      className='flex flex-col gap-1.5 rounded-lg border border-border bg-main-bg p-2.5'
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <span className='font-bold text-text-main'>
                            {attack.name}
                          </span>
                          <span className='rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold text-accent capitalize'>
                            {attack.type}
                          </span>
                        </div>
                        <span className='text-xl font-extrabold text-accent'>
                          {formattedBonus}
                        </span>
                      </div>

                      {attack.traits.length > 0 && (
                        <div className='flex flex-wrap gap-1'>
                          {attack.traits.map((trait) => (
                            <span
                              key={trait}
                              className='rounded border border-border/60 bg-main-card px-1.5 py-0.5 text-[10px] text-text-muted'
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {details.loot && details.loot.length > 0 && (
            <div className='flex flex-col gap-1.5'>
              <span className='text-xs font-bold tracking-wider text-text-muted uppercase'>
                Loot:
              </span>
              <div className='flex flex-wrap gap-1.5'>
                {details.loot.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className='flex items-center gap-1.5 rounded-md border border-border bg-main-bg px-2.5 py-1 text-xs font-medium text-text-main'
                  >
                    {item.quantity > 1 && (
                      <span className='font-bold text-accent'>
                        {item.quantity}x
                      </span>
                    )}

                    <span>{item.name}</span>

                    {item.value !== undefined && item.value > 0 && (
                      <span className='text-[10px] text-text-muted'>
                        ({item.value} gp)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='text-sm text-text-muted'>No details available.</div>
      )}
    </div>
  );
};
