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
  let headerContent: string;
  switch (panelMode) {
    case 'bestiary':
      headerContent = 'Monster Library';
      break;
    case 'inspector':
      headerContent = 'Creature Details';
      break;
    default:
      headerContent = 'You should not see this';
  }
  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl text-text-main'>{headerContent}</h2>
        <button className='md:hidden' onClick={onClosePanel}>
          <img src={ExitCrossIcon} alt='Exit' />
        </button>
      </div>

      <div className='mt-4 flex-1 overflow-y-auto'>
        {panelMode === 'bestiary' && (
          //BeastiaryList will be here
          <p>Bestiary</p>
        )}
        {panelMode === 'inspector' && activeMonster && (
          //MonsterInspector will be here
          <MonsterInspector
            monster={activeMonster}
            onHealthChange={onHealthChange}
          />
        )}
      </div>
    </div>
  );
};
