import type { PanelMode } from '../types';
import ExitCrossIcon from '../assets/exit-cross.svg';

interface MonsterPanelProps {
  panelMode: PanelMode;
  onClosePanel(): void;
  selectedMonsterId: number | null;
}

export const MonsterPanel = ({
  panelMode,
  onClosePanel,
  selectedMonsterId,
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
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl text-text-main'>{headerContent}</h2>
        <button className='md:hidden' onClick={onClosePanel}>
          <img src={ExitCrossIcon} alt='Exit' />
        </button>
      </div>
    </div>
  );
};
