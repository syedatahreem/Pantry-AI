import type { Pages } from "../../types";

interface SidebarProps {
  activeTab: Pages;
  setActiveTab: (tab: Pages) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="w-48 bg-panel flex flex-col p-4 gap-2">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-teal-400 rounded-lg w-7 h-7 flex items-center justify-content-center">
          <span className="text-white text-sm font-bold">P</span>
        </div>
        <span className="text-white font-medium">PantryAI</span>
      </div>

      <button
        className={`px-3 py-2 rounded-xl text-sm text-left ${activeTab === "dashboard" ? "bg-card text-teal-400" : "text-muted"}`}
        onClick={() => setActiveTab("dashboard")}
      >
        Dashboard
      </button>
      <button
        className={`px-3 py-2 rounded-xl text-sm text-left ${activeTab === "pantry" ? "bg-card text-teal-400" : "text-muted"}`}
        onClick={() => setActiveTab("pantry")}
      >
        Pantry
      </button>
      <button
        className={`px-3 py-2 rounded-xl text-sm text-left ${activeTab === "recipe-builder" ? "bg-card text-teal-400" : "text-muted"}`}
        onClick={() => setActiveTab("recipe-builder")}
      >
        Recipe Builder
      </button>
    </div>
  );
};

export default Sidebar;
