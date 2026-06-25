interface SidebarProps {
  isOpen: boolean;
  onCloseMenu(): void;
}

export const Sidebar = ({ isOpen, onCloseMenu }: SidebarProps) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 z-90 transition-transform duration-300 w-60 bg-main-card h-screen md:static md:translate-x-0 md:w-full md:col-span-3
                  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      ></div>
      {isOpen && (
        <div
          className="fixed z-80 inset-0 bg-main-bg w-screen h-screen opacity-50"
          onClick={onCloseMenu}
        ></div>
      )}
    </>
  );
};
