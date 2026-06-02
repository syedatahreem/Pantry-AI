import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="bg-background min-h-screen p-6">
      <div className="flex mb-6 gap-3">
        <div className="text-white text-xl font-semibold italic">P@i</div>
        <span className="text-white text-xl font-semibold">PantryAI</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-panel rounded-2xl overflow-hidden">
          <Dashboard />
        </div>
        <div className="bg-panel rounded-2xl overflow-hidden">
          <Dashboard />
        </div>
        <div className="bg-panel rounded-2xl overflow-hidden">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;
