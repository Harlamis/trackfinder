import burgerMenuIcon from '../assets/burger-menu-icon.svg';

interface MobileHeaderProps {
  isMenuOpen: boolean;
  onOpenMenu(): void;
  onOpenBestiary(): void;
}

export const MobileHeader = ({
  isMenuOpen,
  onOpenMenu,
  onOpenBestiary,
}: MobileHeaderProps) => {
  return (
    <header
      className={`sticky top-0 z-50 flex h-14 items-center bg-main-card p-2.5 md:hidden ${isMenuOpen ? 'justify-end' : 'justify-between'}`}
    >
      <button onClick={onOpenMenu} className={`${isMenuOpen && 'hidden'}`}>
        <img src={burgerMenuIcon} alt='Menu' />
      </button>
      <div>
        <h1 className='text-2xl text-accent'>PFtracker</h1>
        <button
          className='w-full rounded-2xl bg-accent text-text-main transition-all duration-200 hover:bg-accent-hover hover:text-text-muted'
          onClick={onOpenBestiary}
        >
          + Monster
        </button>
      </div>
    </header>
  );
};
