import burgerMenuIcon from "../assets/burger-menu-icon.svg";

interface MobileHeaderProps {
  onOpenMenu(): void;
}

export const MobileHeader = ({ onOpenMenu }: MobileHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-main-card flex justify-between p-2.5 md:hidden">
      <button onClick={onOpenMenu}>
        <img src={burgerMenuIcon} alt="Menu" />
      </button>
      <h1 className="text-accent text-2xl">PFtracker</h1>
    </header>
  );
};
