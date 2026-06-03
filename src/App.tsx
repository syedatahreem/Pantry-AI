import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import type { Pages } from "./types";
import Ingredients from "./components/Pantry.tsx/Ingredients";
import RecipeCostBuilder from "./components/RecipeCostBuilder/RecipeCostBuilder";

function App() {
  const [activeTab, setActiveTab] = useState<Pages>("dashboard");

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "pantry" && <Ingredients />}
      {activeTab === "recipe-builder" && <RecipeCostBuilder />}
    </Layout>
  );
}

export default App;
