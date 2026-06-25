import burgerMenuIcon from '../assets/burger-menu-icon.svg';
import type { Encounter } from '../types';
import { EncountersList } from './EncountersList';

interface SidebarProps {
  isOpen: boolean;
  onCloseMenu(): void;
  encounters: Encounter[];
  activeEncounterId: number | null;
  onSelectEncounter(id: number): void;
}

export const Sidebar = ({
  isOpen,
  onCloseMenu,
  encounters,
  activeEncounterId,
  onSelectEncounter,
}: SidebarProps) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 z-90 flex h-screen w-60 flex-col bg-main-card transition-transform duration-300 md:static md:col-span-3 md:w-full md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='flex h-14 w-full items-center justify-end border-b-border p-2.5'>
          <button onClick={onCloseMenu} className='h-fit md:hidden'>
            <img src={burgerMenuIcon} alt='Menu' />
          </button>
        </div>

        <div className='flex w-full flex-col gap-2.5'>
          <h2 className='text-2xl text-text-main'>Your Encounters</h2>
          <EncountersList
            encounters={encounters}
            activeEncounterId={activeEncounterId}
            onSelectActive={onSelectEncounter}
          />
        </div>
      </div>
      {isOpen && (
        <div
          className='fixed inset-0 z-80 h-screen w-screen bg-main-bg opacity-50'
          onClick={onCloseMenu}
        ></div>
      )}
    </>
  );
};
