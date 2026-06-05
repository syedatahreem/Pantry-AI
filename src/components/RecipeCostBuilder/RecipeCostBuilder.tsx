import { useState } from "react";
import type { IngredientsType, SavedRecipe } from "../../types";

type InputProps = {
  ingredients: IngredientsType[];
  recipes: SavedRecipe[];
  setRecipes: React.Dispatch<React.SetStateAction<SavedRecipe[]>>;
};

const RecipeCostBuilder = ({
  ingredients,
  recipes,
  setRecipes,
}: InputProps) => {
  const [selectedItems, setSelectedItems] = useState<SavedRecipe>({
    id: "",
    name: "",
    servings: "",
    recipes: [],
  });

  const saveRecipe = () => {
    if (
      !selectedItems.name ||
      !selectedItems.servings ||
      selectedItems.recipes.length <= 0
    )
      return;
    const newRecipe = { ...selectedItems, id: crypto.randomUUID() };
    setRecipes([...recipes, newRecipe]);
    setSelectedItems({ id: "", name: "", servings: "", recipes: [] });
  };

  return (
    <div>
      <h3 className="text-sm text-gray-400 mb-4">RECIPE BUILDER</h3>
      <div className="flex gap-4">
        <input
          className="bg-slate-50 p-2 rounded-md text-white"
          placeholder="Recipe name"
          bg-slate-50
          type="text"
          value={selectedItems.name}
          onChange={(e) =>
            setSelectedItems({ ...selectedItems, name: e.target.value })
          }
        />
        <input
          className="bg-slate-50  p-2 rounded-md  text-white"
          placeholder="No of servings"
          type="text"
          value={selectedItems.servings}
          onChange={(e) =>
            setSelectedItems({ ...selectedItems, servings: e.target.value })
          }
        />
      </div>
      <h3 className="text-sm text-gray-400 mt-8 mb-4">
        SELECT INGREDIENTS USED
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {ingredients.map((ingredient) => (
          <button
            className={`bg-card p-3 rounded-lg flex justify-between items-center cursor-pointer ${
              selectedItems.recipes.some((r) => r.id === ingredient.id)
                ? "bg-teal border border-teal-400"
                : "bg-card"
            }`}
            key={ingredient.id}
            onClick={() =>
              setSelectedItems({
                ...selectedItems,
                recipes: [...selectedItems.recipes, { id: ingredient.id }],
              })
            }
          >
            <p>{ingredient.name}</p>
            <p className="text-teal">{ingredient.quantity + ingredient.unit}</p>
          </button>
        ))}
      </div>
      <div className="bg-breakdown w-1/2 mt-10 rounded-xl p-4">
        <p className="text-teal mb-4">Cost breakdown</p>
        <div className="text-white flex flex-col justify-between text-sm">
          {selectedItems.recipes.map((selectItem) =>
            ingredients.map(
              (ingredient) =>
                ingredient.id === selectItem.id && (
                  <div className="flex  justify-between">
                    <p>
                      {ingredient.name}({ingredient.quantity + ingredient.unit})
                    </p>
                    <p>{ingredient.totalCost}</p>
                  </div>
                ),
            ),
          )}
        </div>
        <div className="text-white flex justify-between text-base mt-4">
          <p>Cost per serving</p>
          <p className="text-teal">$2.70</p>
        </div>
      </div>
      <button
        className="text-white bg-teal p-2 rounded-lg font-bold mt-6 w-1/2"
        onClick={saveRecipe}
      >
        Save Recipe
      </button>
    </div>
  );
};

export default RecipeCostBuilder;
