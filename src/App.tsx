import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import type { IngredientsType, Pages } from "./types";
import Ingredients from "./components/Pantry.tsx/Ingredients";
import RecipeCostBuilder from "./components/RecipeCostBuilder/RecipeCostBuilder";

export const ingredients = [
  { name: "Chicken", quantity: "200", unit: "g", totalCost: "$3.20" },
  { name: "Pasta", quantity: "3", unit: "kg", totalCost: "$4.20" },
  { name: "Tomatoes", quantity: "450", unit: "g", totalCost: "$7.20" },
  { name: "Onions", quantity: "450", unit: "g", totalCost: "$7.20" },
  { name: "Chicken", quantity: "200", unit: "g", totalCost: "$3.20" },
  { name: "Pasta", quantity: "3", unit: "kg", totalCost: "$4.20" },
  { name: "Tomatoes", quantity: "450", unit: "g", totalCost: "$7.20" },
  { name: "Onions", quantity: "450", unit: "g", totalCost: "$7.20" },
];

function App() {
  const [activeTab, setActiveTab] = useState<Pages>("dashboard");
  const [ingredients, setIngredients] = useState<IngredientsType[]>([]);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "pantry" && (
        <Ingredients
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      )}
      {activeTab === "recipe-builder" && (
        <RecipeCostBuilder ingredients={ingredients} />
      )}
    </Layout>
  );
}

export default App;
