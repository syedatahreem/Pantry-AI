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
    <div className="w-48 bg-panel flex flex-col p-6 gap-2">
      <div className="flex items-center gap-2 mb-6 text-white font-medium">
        <svg
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
        >
          <rect x="0" y="0" width="80" height="80" rx="18" fill="#14b8a6" />
          <path
            d="M25 30 Q40 18 55 30"
            stroke="#fff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <rect
            x="18"
            y="32"
            width="44"
            height="5"
            rx="2.5"
            fill="#fff"
            opacity="0.95"
          />
          <rect
            x="22"
            y="39"
            width="5"
            height="24"
            rx="2.5"
            fill="#fff"
            opacity="0.95"
          />
          <rect
            x="53"
            y="39"
            width="5"
            height="24"
            rx="2.5"
            fill="#fff"
            opacity="0.95"
          />
          <rect
            x="22"
            y="59"
            width="36"
            height="5"
            rx="2.5"
            fill="#fff"
            opacity="0.95"
          />
          <rect
            x="31"
            y="43"
            width="18"
            height="14"
            rx="3"
            fill="#fff"
            opacity="0.4"
          />
        </svg>
        <div className="flex flex-col ">
          <span>
            Pantry <span className="text-teal">AI</span>
          </span>
          <p className="text-muted text-[8px] ">smart recipe costing</p>
        </div>
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
