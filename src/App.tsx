import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import type { Pages } from "./types";

function App() {
  const [activeTab, setActiveTab] = useState<Pages>("dashboard");

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "pantry" && <Dashboard />}
      {activeTab === "recipe-builder" && <Dashboard />}
    </Layout>
  );
}

export default App;
