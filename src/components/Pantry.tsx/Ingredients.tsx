import { useState } from "react";
import type { IngredientsType } from "../../types";

type IngredientProps = {
  ingredients: IngredientsType[];
  setIngredients: React.Dispatch<React.SetStateAction<IngredientsType[]>>;
};

const Ingredients = ({ ingredients, setIngredients }: IngredientProps) => {
  const [form, setForm] = useState<IngredientsType>({
    id: "",
    name: "",
    quantity: "",
    unit: "",
    totalCost: "",
  });

  const handleSave = () => {
    if (!form.name || !form.quantity || !form.unit) return;
    setIngredients([...ingredients, { ...form, id: crypto.randomUUID() }]);
    setForm({
      id: "",
      name: "",
      quantity: "",
      unit: "",
      totalCost: "",
    });
  };
  return (
    <div className="w-full">
      <h3 className="text-sm text-gray-400 mb-4">INGREDIENT MANAGER</h3>

      <div className="flex flex-col gap-4 space-between rounded-xl bg-card p-6">
        <p className="text-white ">Add new ingredient</p>

        <div className="flex gap-4">
          <input
            className="bg-slate-50  p-2 rounded-md text-slate-900 "
            placeholder="Ingredient name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="bg-slate-50  p-2 rounded-md  text-slate-900 "
            placeholder="Quantity"
            type="text"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <input
            className="bg-slate-50 p-2 rounded-md text-slate-900 "
            placeholder="Unit"
            type="text"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          />
          <input
            className="bg-slate-50 p-2 rounded-md text-slate-900"
            placeholder="Price $"
            type="text"
            value={form.totalCost}
            onChange={(e) => setForm({ ...form, totalCost: e.target.value })}
          />
          <button
            className="text-white bg-teal p-2 rounded-lg w-1/3 font-bold"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      <h3 className="text-sm text-gray-400 mb-4 mt-10">YOUR PANTRY</h3>
      <div className="grid grid-cols-6 gap-3">
        {ingredients.map((ingredient: any, index) => (
          <div className="bg-card p-2 rounded-lg " key={index}>
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
