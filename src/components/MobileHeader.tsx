import burgerMenuIcon from '../assets/burger-menu-icon.svg';

interface MobileHeaderProps {
  onOpenMenu(): void;
}

export const MobileHeader = ({ onOpenMenu }: MobileHeaderProps) => {
  return (
    <header className='sticky top-0 z-50 flex justify-between bg-main-card p-2.5 md:hidden'>
      <button onClick={onOpenMenu}>
        <img src={burgerMenuIcon} alt='Menu' />
      </button>
      <h1 className='text-2xl text-accent'>PFtracker</h1>
    </header>
  );
};
