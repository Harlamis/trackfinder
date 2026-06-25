import burgerMenuIcon from '../assets/burger-menu-icon.svg';

interface MobileHeaderProps {
  isMenuOpen: boolean,
  onOpenMenu(): void;
}

export const MobileHeader = ({ isMenuOpen, onOpenMenu }: MobileHeaderProps) => {
  return (
    <header className='sticky top-0 z-50 flex h-14 items-center justify-between bg-main-card p-2.5 md:hidden'>
        <button onClick={onOpenMenu} className={`${isMenuOpen && 'opacity-0'}`}>
        <img src={burgerMenuIcon} alt='Menu' />
      </button>
      <h1 className='text-2xl text-accent'>PFtracker</h1>
    </header>
  );
};