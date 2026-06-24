interface SidebarProps {
  isOpen: boolean;
  onCloseMenu(): void;
}

export const Sidebar = ({ isOpen, onCloseMenu }: SidebarProps) => {
  return (
    <div
      className={`w-64 p-4 transition-all ${
        isOpen
          ? "bg-main-card translate-0 opacity-100"
          : "bg-main-bg/50 -translate-x-10 opacity-30 pointer-events-none"
      }`}
    ></div>
  );
};
