import { useState } from "react";
import type { IngredientsType, Pages, SavedRecipe } from "../../types";
import { recipeOptions } from "../../utils/constants";
import EditIcon from "../ui/EditIcon";
import DeleteIcon from "../ui/DeleteIcon";

type InputProps = {
  ingredients: IngredientsType[];
  recipes: SavedRecipe[];
  setRecipes: React.Dispatch<React.SetStateAction<SavedRecipe[]>>;
  setIngredients: React.Dispatch<React.SetStateAction<IngredientsType[]>>;
  setActiveTab: React.Dispatch<React.SetStateAction<Pages>>;
};

const RecipeCostBuilder = ({
  ingredients,
  recipes,
  setRecipes,
  setIngredients,
  setActiveTab,
}: InputProps) => {
  const [selectedItems, setSelectedItems] = useState<SavedRecipe>({
    id: "",
    name: "",
    servings: 0,
    recipes: [],
    costPerServing: 0,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingQuantities, setPendingQuantities] = useState<
    Record<string, number>
  >({});

  const totalCost = selectedItems.recipes.reduce((sum, selectedItem) => {
    const ingredient = ingredients.find((ing) => ing.id === selectedItem.id);
    if (!ingredient) return sum;
    const quantityUsed = selectedItem.quantityUsed || ingredient.quantity;
    const costPerUnit = ingredient.totalCost / ingredient.quantity;
    return sum + costPerUnit * quantityUsed;
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

    setIngredients(
      ingredients
        .map((ingredient) => {
          const used = selectedItems.recipes.find(
            (r) => r.id === ingredient.id,
          );
          if (!used) return ingredient;
          return {
            ...ingredient,
            quantity:
              ingredient.quantity - (used.quantityUsed || ingredient.quantity),
            totalCost:
              ingredient.totalCost *
              ((ingredient.quantity - (used.quantityUsed ?? 0)) /
                ingredient.quantity),
          };
        })
        .filter((ingredient) => ingredient.quantity > 0),
    );

    setRecipes([...recipes, newRecipe]);
    setSelectedItems({
      id: "",
      name: "",
      servings: 0,
      recipes: [],
      costPerServing: 0,
    });
    setPendingQuantities({});
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

      <div className="flex flex-col gap-4 rounded-xl bg-card p-8 w-10/12">
        <p className="text-white ">Add new recipe</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="relative">
            <input
              className="bg-panel border border-slate-700 rounded-xl p-3 text-white text-sm w-full"
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
            className="bg-panel border border-slate-700 rounded-xl p-3 text-white text-sm w-full"
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
        {ingredients.length === 0 && (
          <p className="text-sm text-white mt-2">
            No ingredients in your pantry yet — add some to get started.
          </p>
        )}
        <div className="grid grid-cols-3 gap-3">
          {ingredients.map((ingredient) => (
            <button
              className={`bg-card p-2 rounded-lg flex justify-between items-center text-white cursor-pointer text-xs ${
                selectedItems.recipes.some((r) => r.id === ingredient.id)
                  ? "bg-teal border border-teal-400"
                  : "bg-card  border border-white"
              }`}
              key={ingredient.id}
              onClick={() => {
                const isSelected = selectedItems.recipes.some(
                  (r) => r.id === ingredient.id,
                );

                if (isSelected) {
                  setSelectedItems({
                    ...selectedItems,
                    recipes: selectedItems.recipes.filter(
                      (r) => r.id !== ingredient.id,
                    ),
                  });
                } else {
                  setSelectedItems({
                    ...selectedItems,
                    recipes: [
                      ...selectedItems.recipes,
                      {
                        id: ingredient.id,
                        quantityUsed: pendingQuantities[ingredient.id] ?? 0,
                      },
                    ],
                  });
                }
              }}
            >
              <p>{ingredient.name}</p>
              <div className="flex gap-4 items-center">
                {editingId === ingredient.id ? (
                  <>
                    <input
                      placeholder="0"
                      type="number"
                      min="0"
                      step="0.1"
                      max={ingredient.quantity}
                      className="text-white bg-panel w-16 rounded px-2 py-1 text-sm"
                      value={
                        selectedItems.recipes.find(
                          (r) => r.id === ingredient.id,
                        )?.quantityUsed ||
                        pendingQuantities[ingredient.id] ||
                        ""
                      }
                      onChange={(e) => {
                        const value = Math.min(
                          Number(e.target.value),
                          ingredient.quantity,
                        );
                        const isSelected = selectedItems.recipes.some(
                          (r) => r.id === ingredient.id,
                        );
                        if (isSelected) {
                          setSelectedItems({
                            ...selectedItems,
                            recipes: selectedItems.recipes.map((r) =>
                              r.id === ingredient.id
                                ? { ...r, quantityUsed: value }
                                : r,
                            ),
                          });
                        } else {
                          setPendingQuantities({
                            ...pendingQuantities,
                            [ingredient.id]: value,
                          });
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      onBlur={() => setEditingId(null)}
                    />
                    <p> {ingredient.unit}</p>
                  </>
                ) : (
                  <p className="text-white text-sm">
                    {selectedItems.recipes.find((r) => r.id === ingredient.id)
                      ?.quantityUsed ||
                      pendingQuantities[ingredient.id] ||
                      ingredient.quantity}
                    {" / "}
                    {ingredient.quantity}
                    {" " + ingredient.unit}
                  </p>
                )}
                <EditIcon
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setEditingId(ingredient.id);
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
        <button
          className="bg-panel text-teal rounded-2xl p-2 mt-4 w-full text-center"
          onClick={() => setActiveTab("pantry")}
        >
          + Add Ingredients
        </button>
      </div>
      <div className="bg-breakdown w-1/2 mt-10 rounded-xl p-4">
        <p className="text-teal mb-4">Cost breakdown</p>
        <div className="text-white flex flex-col justify-between text-sm">
          {selectedItems.recipes.length === 0 && (
            <p className="text-teal-400/70 text-sm">
              No ingredients selected — add at least one to save your recipe.
            </p>
          )}
          {selectedItems.recipes.map((selectItem) =>
            ingredients.map(
              (ingredient) =>
                ingredient.id === selectItem.id && (
                  <div className="flex justify-between">
                    <p>
                      {ingredient.name}(
                      {selectItem.quantityUsed || ingredient.quantity}
                      {ingredient.unit})
                    </p>
                    <p>
                      {selectItem.quantityUsed
                        ? (
                            (selectItem.quantityUsed * ingredient.totalCost) /
                            ingredient.quantity
                          ).toFixed(2)
                        : ingredient.totalCost.toFixed(2)}
                    </p>
                  </div>
                ),
            ),
          )}
        </div>

        <div className="text-teal flex justify-between text-base mt-4">
          <p>Cost per serving</p>
          <p className="text-teal">
            {selectedItems.recipes.length > 0
              ? `${costPerServing.toFixed(2)}`
              : "$0"}
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
