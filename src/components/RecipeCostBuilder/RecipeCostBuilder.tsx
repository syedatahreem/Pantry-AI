import type { IngredientsType } from "../../types";

type InputProps = {
  ingredients: IngredientsType[];
};

const RecipeCostBuilder = ({ ingredients }: InputProps) => {
  return (
    <div>
      <h3 className="text-sm text-gray-400 mb-4">RECIPE BUILDER</h3>
      <div className="flex gap-4">
        <input
          className="bg-panel p-2 rounded-md text-white"
          placeholder="Recipe name"
        />
        <input
          className="bg-panel p-2 rounded-md  text-white"
          placeholder="No of servings"
        />
      </div>
      <h3 className="text-sm text-gray-400 mt-8 mb-4">
        SELECT INGREDIENTS USED
      </h3>
      <div className="grid grid-cols-4 gap-3">
        {ingredients.map((ingredient, index) => (
          <button
            className="p-2 text-white bg-panel rounded-lg flex justify-between"
            key={index}
          >
            <p>{ingredient.name}</p>
            <p className="text-teal">{ingredient.quantity + ingredient.unit}</p>
          </button>
        ))}
      </div>
      <div className="bg-breakdown w-1/2 mt-10 rounded-xl p-4">
        <p className="text-teal mb-4">Cost breakdown</p>
        <div className="text-white flex justify-between text-sm">
          <p>Chicken breast (300g)</p>
          <p>$3.90</p>
        </div>
        <div className="text-white flex justify-between text-sm">
          <p>Basmati rice (300g)</p>
          <p>$4.90</p>
        </div>
        <div className="text-white flex justify-between text-base mt-4">
          <p>Cost per serving</p>
          <p className="text-teal">$2.70</p>
        </div>
      </div>
      <button className="text-white bg-teal p-2 rounded-lg font-bold mt-6 w-1/2">
        Save Recipe
      </button>
    </div>
  );
};

export default RecipeCostBuilder;
