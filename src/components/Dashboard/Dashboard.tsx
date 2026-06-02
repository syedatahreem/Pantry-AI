const user = "Tahreem";

const statList = [
  { label: "Ingredients", value: "12" },
  { label: "Recipes", value: "4" },
  { label: "Avg cost", value: "$3.20", teal: true },
];

const recipes = [
  { name: "Chicken curry", servings: "2", totalCost: "$3.20" },
  { name: "Pasta bolognese", servings: "3", totalCost: "$4.20" },
  { name: "Veggie stir fry", servings: "4", totalCost: "$7.20" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold text-white">
        Good evening, {user}
      </h1>
      <h4 className="text-sm text-muted  mt-1">
        What are you cooking tonight?
      </h4>

      <h3 className="mt-4 mb-2 text-sm text-gray-400">OVERVIEW</h3>
      <div className="flex gap-3">
        {statList.map((item) => (
          <div className="bg-card rounded-2xl p-4 flex-1">
            <p className="text-muted  font-bold text-sm">{item.label}</p>
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
          <div className="bg-card rounded-2xl p-4 flex-1 flex justify-between">
            <div>
              <p className="text-muted font-bold text-sm">{recipe.name}</p>
              <p className="text-muted text-xs">{recipe.servings} servings</p>
            </div>
            <p className="text-teal font-bold text-sm">{recipe.totalCost}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
