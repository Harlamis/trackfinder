import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ActiveMonster, PanelMode } from '../types';
import ExitCrossIcon from '../assets/exit-cross.svg';
import { MonsterInspector } from './MonsterInspector';

interface MonsterPanelProps {
  panelMode: PanelMode;
  onClosePanel(): void;
  onHealthChange(amount: number): void;
  activeMonster: ActiveMonster | null;
}

export const MonsterPanel = ({
  panelMode,
  onClosePanel,
  onHealthChange,
  activeMonster,
}: MonsterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (panelMode === 'closed' || (panelMode === 'inspector' && !activeMonster)) {
    return null;
  }

  const headerContent =
    panelMode === 'bestiary' ? 'Monster Library' : 'Creature Details';

  return (
    <>
      {isExpanded && (
        <div
          className='fixed inset-0 z-40 bg-black/50 md:hidden'
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div
        className={twMerge(
          // Base
          'flex flex-col bg-main-card p-1 transition-all duration-300 ease-in-out',

          // Mobile
          'fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl shadow-2xl md:shadow-none',
          isExpanded ? 'h-[90vh]' : 'h-70',

          // Desktop
          'md:static md:col-span-3 md:h-full md:w-full md:rounded-none md:p-0'
        )}
      >
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className='-mt-2 mb-0 flex w-full cursor-pointer items-center justify-center py-2 md:hidden'
        >
          <div className='h-1.5 w-12 rounded-full bg-border' />
        </div>

        <div className='flex items-center justify-between pb-2'>
          <h2 className='text-2xl text-text-main'>{headerContent}</h2>
          <button className='md:hidden' onClick={onClosePanel}>
            <img src={ExitCrossIcon} alt='Exit' />
          </button>
        </div>

        <div className='mt-2 flex-1 overflow-y-auto'>
          {panelMode === 'bestiary' && (
            // BestiaryList will be here
            <p className='text-text-muted'>Bestiary library coming soon...</p>
          )}
          {panelMode === 'inspector' && activeMonster && (
            <MonsterInspector
              monster={activeMonster}
              onHealthChange={onHealthChange}
            />
          )}
        </div>
      </div>
    </>
  );
};
