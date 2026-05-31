interface MenuBarProps {}

export const MenuBar: React.FC<MenuBarProps> = () => {
  return (
    <nav className="fixed  max-w-6xl top-0 bg-white w-full h-8 text-xl border-b border-black flex items-center">
      <button className="px-3 py-1 hover:bg-black hover:text-white"></button>
      <button className="px-3 py-1 hover:bg-black hover:text-white">
        File
      </button>
      <button className="px-3 py-1 hover:bg-black hover:text-white">
        Edit
      </button>
      <button className="px-3 py-1 hover:bg-black hover:text-white">
        View
      </button>
      <button className="px-3 py-1 hover:bg-black hover:text-white">Go</button>
      <button className="px-3 py-1 hover:bg-black hover:text-white">
        Help
      </button>
    </nav>
  );
};
