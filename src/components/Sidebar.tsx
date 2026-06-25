interface SidebarProps {
  isOpen: boolean;
  onCloseMenu(): void;
}

export const Sidebar = ({ isOpen, onCloseMenu }: SidebarProps) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 z-90 h-screen w-60 bg-main-card transition-transform duration-300 md:static md:col-span-3 md:w-full md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      ></div>
      {isOpen && (
        <div
          className='fixed inset-0 z-80 h-screen w-screen bg-main-bg opacity-50'
          onClick={onCloseMenu}
        ></div>
      )}
    </>
  );
};
