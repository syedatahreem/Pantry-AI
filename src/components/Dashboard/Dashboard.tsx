import type { Pages, SavedRecipe } from "../../types";

const user = "Tahreem";

type InputProps = {
  recipes: SavedRecipe[];
  ingredientsLength: number;
  setActiveTab: React.Dispatch<React.SetStateAction<Pages>>;
};

const Dashboard = ({
  recipes,
  ingredientsLength,
  setActiveTab,
}: InputProps) => {
  const totalCostOfRecipes = recipes.reduce(
    (acc, item) => acc + item.costPerServing,
    0,
  );

  const statList = [
    { label: "Ingredients", value: ingredientsLength },
    { label: "Recipes", value: recipes.length },
    { label: "Avg cost", value: totalCostOfRecipes.toFixed(2), teal: true },
  ];

  return (
    <div className="min-h-screen px-6 pb-6">
      <div className="flex gap-4">
        <img src="/images/food-bowl.png" className="w-12 h-12 opacity-80" />
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-white">
            Good day, {user}
          </h1>
          <h4 className="text-sm text-muted  mt-1">
            What are you cooking today?
          </h4>
        </div>
      </div>
      <h3 className="mt-4 mb-2 text-sm text-gray-400">OVERVIEW</h3>
      <div className="flex gap-3">
        {[...statList].map((item) => (
          <div className="bg-card rounded-2xl p-4 flex-1">
            <p className="text-muted  font-bold text-sm">{item?.label}</p>
            <p
              className="text-2xl font-medium mt-1"
              style={{ color: item.teal ? "var(--color-teal)" : "#f1f5f9" }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
      <h3 className="mt-4 mb-2 text-sm text-gray-400">SAVED RECIPES</h3>
      <div className="flex flex-col gap-3 ">
        {recipes.map((recipe) => (
          <div
            className="bg-card rounded-2xl p-4 flex-1 flex justify-between"
            key={recipe.id}
          >
            <div>
              <p className="text-muted font-bold text-sm">{recipe.name}</p>
              <p className="text-muted text-xs">{recipe.servings} servings</p>
            </div>
            <p className="text-teal font-bold text-sm">
              {recipe.costPerServing.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      <button
        className="bg-card text-teal rounded-2xl p-4 mt-4 w-full text-center"
        onClick={() => setActiveTab("recipe-builder")}
      >
        + New recipe
      </button>
    </div>
  );
};

export default Dashboard;
