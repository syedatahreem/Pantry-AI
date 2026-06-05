import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import type { IngredientsType, Pages, SavedRecipe } from "./types";
import Ingredients from "./components/Pantry.tsx/Ingredients";
import RecipeCostBuilder from "./components/RecipeCostBuilder/RecipeCostBuilder";

function App() {
  const [activeTab, setActiveTab] = useState<Pages>("dashboard");
  const [ingredients, setIngredients] = useState<IngredientsType[]>([]);
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "dashboard" && <Dashboard recipes={recipes} />}
      {activeTab === "pantry" && (
        <Ingredients
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      )}
      {activeTab === "recipe-builder" && (
        <RecipeCostBuilder ingredients={ingredients} recipes={recipes} setRecipes={setRecipes} />
      )}
    </Layout>
  );
}

export default App;
