import { useState } from "react";
import type { IngredientsType, SavedRecipe } from "../../types";
import { recipeOptions } from "../../utils/constants";
import EditIcon from "../ui/EditIcon";
import DeleteIcon from "../ui/DeleteIcon";

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
    servings: 0,
    recipes: [],
    costPerServing: 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [useQuantity, setUseQuantity] = useState(0);

  const totalCost = selectedItems.recipes.reduce((sum, selectedItem) => {
    const ingredient = ingredients.find((ing) => ing.id === selectedItem.id);
    if (!ingredient) return sum;
    return sum + Number(ingredient.totalCost);
  }, 0);

  const costPerServing: number =
    totalCost / (selectedItems.servings === 0 ? 1 : selectedItems.servings);

  const saveRecipe = () => {
    if (
      !selectedItems.name ||
      !selectedItems.servings ||
      selectedItems.recipes.length <= 0
    )
      return;
    const newRecipe = {
      ...selectedItems,
      id: crypto.randomUUID(),
      costPerServing: costPerServing,
    };
    setRecipes([...recipes, newRecipe]);
    setSelectedItems({
      id: "",
      name: "",
      servings: 0,
      recipes: [],
      costPerServing: 0,
    });
  };
  const [showRecipeSuggestions, setShowRecipeSuggestions] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState<string[]>([]);

  const handleRecipeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedItems({ ...selectedItems, name: value });
    setFilteredRecipes(
      recipeOptions.filter((r) =>
        r.toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setShowRecipeSuggestions(true);
  };

  const handleRecipeFocus = () => {
    setFilteredRecipes(
      selectedItems.name
        ? recipeOptions.filter((r) =>
            r.toLowerCase().includes(selectedItems.name.toLowerCase()),
          )
        : recipeOptions,
    );
    setShowRecipeSuggestions(true);
  };
  return (
    <div>
      <h3 className="text-sm text-gray-400 mb-4">RECIPE BUILDER</h3>

      <div className="flex flex-col gap-4 rounded-xl bg-card p-8">
        <p className="text-white ">Add new recipe</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="relative">
            <input
              className="bg-slate-50 p-2 pr-8 rounded-md text-slate-900 w-full"
              placeholder="Recipe name"
              type="text"
              value={selectedItems.name}
              onChange={handleRecipeNameChange}
              onFocus={handleRecipeFocus}
              onBlur={() =>
                setTimeout(() => setShowRecipeSuggestions(false), 150)
              }
            />
            <svg
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            {showRecipeSuggestions && filteredRecipes.length > 0 && (
              <div className="absolute z-10 w-full bg-slate-50 border border-slate-200 rounded-md mt-1 max-h-48 overflow-y-auto shadow-md">
                {filteredRecipes.map((item) => (
                  <div
                    key={item}
                    className="px-3 py-2 text-slate-900 text-sm hover:bg-slate-200 cursor-pointer"
                    onMouseDown={() => {
                      setSelectedItems({ ...selectedItems, name: item });
                      setShowRecipeSuggestions(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <input
            className="bg-slate-50 p-2 rounded-md text-slate-900"
            placeholder="No of servings"
            type="number"
            min="1"
            step="1"
            value={selectedItems.servings === 0 ? "" : selectedItems.servings}
            onChange={(e) =>
              setSelectedItems({
                ...selectedItems,
                servings: Number(e.target.value),
              })
            }
          />
        </div>

        <h3 className="text-sm text-gray-400 mt-8 mb-4">
          SELECT INGREDIENTS USED
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {ingredients.map((ingredient) => (
            <button
              className={`bg-card p-2 rounded-lg flex justify-between items-center text-white cursor-pointer ${
                selectedItems.recipes.some((r) => r.id === ingredient.id)
                  ? "bg-teal border border-teal-400"
                  : "bg-card  border border-white"
              }`}
              key={ingredient.id}
              onClick={() => {
                setSelectedItems({
                  ...selectedItems,
                  recipes: [...selectedItems.recipes, { id: ingredient.id }],
                });
              }}
            >
              <p>{ingredient.name}</p>
              <div className="flex gap-4 items-center">
                {isEditing ? (
                  <>
                    <input
                      placeholder="Quantity"
                      type="number"
                      min="0"
                      step="0.1"
                      className="text-white bg-panel w-16 rounded px-2 py-1 text-sm"
                      value={useQuantity}
                      onChange={(e) => setUseQuantity(Number(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                      onBlur={() => setIsEditing(false)}
                    />
                    <p> {ingredient.unit}</p>
                  </>
                ) : (
                  <p className="text-white">
                    {useQuantity !== 0 ? useQuantity : ingredient.quantity}
                    {" " + ingredient.unit}
                  </p>
                )}
                <EditIcon
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                />
                <DeleteIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItems({
                      ...selectedItems,
                      recipes: selectedItems.recipes.filter(
                        (recipe) => recipe.id !== ingredient.id,
                      ),
                    });
                  }}
                />
              </div>
            </button>
          ))}
        </div>
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
          <p className="text-teal">
            {selectedItems.recipes.length > 0 ? `${costPerServing}` : ""}
          </p>
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
