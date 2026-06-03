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

const Ingredients = () => {
  return (
    <div className="w-full">
      <h3 className="text-sm text-gray-400 mb-4">INGREDIENT MANAGER</h3>

      <div className="flex flex-col gap-4 space-between rounded-xl bg-card p-6">
        <p className="text-white ">Add new ingredient</p>

        <div className="flex gap-4">
          <input
            className="bg-panel p-2 rounded-md text-white"
            placeholder="Ingredient name"
          />
          <input
            className="bg-panel p-2 rounded-md  text-white"
            placeholder="Quantity"
          />
          <input
            className="bg-panel p-2 rounded-md text-white"
            placeholder="Unit"
          />
          <input
            className="bg-panel p-2 rounded-md text-white"
            placeholder="Price $"
          />
          <button className="text-white bg-teal p-2 rounded-lg w-1/3 font-bold">
            Save
          </button>
        </div>
      </div>

      <h3 className="text-sm text-gray-400 mb-4 mt-10">YOUR PANTRY</h3>
      <div className="grid grid-cols-3 gap-3">
        {ingredients.map((ingredient, index) => (
          <div
            className="bg-card p-2 rounded-lg flex justify-between items-center"
            key={index}
          >
            <p className="text-white text-base font-medium">
              {ingredient.name}
            </p>
            <div className="flex gap-2 text-sm text-muted">
              <p>
                {ingredient.quantity}
                {ingredient.unit}
              </p>
              <span className="text-teal">·</span>
              <p>{ingredient.totalCost}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ingredients;
