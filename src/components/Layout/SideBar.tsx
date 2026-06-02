import type { Pages } from "../../types";

const navItems = [
  { label: "Dashboard", tab: "dashboard" },
  { label: "Pantry", tab: "pantry" },
  { label: "Recipe Builder", tab: "recipe-builder" },
] as const;
interface SidebarProps {
  activeTab: Pages;
  setActiveTab: (tab: Pages) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="w-48 bg-panel flex flex-col p-4 gap-2">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-white font-medium">PantryAI</span>
      </div>

      {navItems.map((item) => (
        <button
          key={item.tab}
          className={`px-3 py-2 rounded-xl text-sm font-bold text-left w-full text-white ${
            activeTab === item.tab && "bg-card"
          }`}
          onClick={() => setActiveTab(item.tab)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
