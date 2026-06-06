import { useState } from "react";
import type { IngredientsType, Units } from "../../types";
import { ingredientOptions } from "../../utils/constants";

type IngredientProps = {
  ingredients: IngredientsType[];
  setIngredients: React.Dispatch<React.SetStateAction<IngredientsType[]>>;
};

const Ingredients = ({ ingredients, setIngredients }: IngredientProps) => {
  const [form, setForm] = useState<IngredientsType>({
    id: "",
    name: "",
    quantity: 0,
    unit: "kg",
    totalCost: 0,
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm({ ...form, name: value });
    setFiltered(
      ingredientOptions.filter((i) =>
        i.toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setShowSuggestions(true);
  };

  const handleFocus = () => {
    setFiltered(
      form.name
        ? ingredientOptions.filter((i) =>
            i.toLowerCase().includes(form.name.toLowerCase()),
          )
        : ingredientOptions,
    );
    setShowSuggestions(true);
  };
  const handleSave = () => {
    if (!form.name || !form.quantity || !form.unit) return;
    setIngredients([...ingredients, { ...form, id: crypto.randomUUID() }]);
    setForm({
      id: "",
      name: "",
      quantity: 0,
      unit: "kg",
      totalCost: 0,
    });
  };
  return (
    <div className="w-full">
      <h3 className="text-sm text-gray-400 mb-4">INGREDIENT MANAGER</h3>

      <div className="flex flex-col gap-4 space-between rounded-xl bg-card p-6">
        <p className="text-white ">Add new ingredient</p>

        <div className="flex gap-4">
          <div className="relative">
            <input
              className="bg-slate-50 p-2 pr-8 rounded-md text-slate-900 w-full"
              placeholder="Ingredient name"
              type="text"
              value={form.name}
              onChange={handleNameChange}
              onFocus={handleFocus}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
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
            {showSuggestions && filtered.length > 0 && (
              <div className="absolute z-10 w-full bg-slate-50 border border-slate-200 rounded-md mt-1 max-h-48 overflow-y-auto shadow-md">
                {filtered.map((item) => (
                  <div
                    key={item}
                    className="px-3 py-2 text-slate-900 text-sm hover:bg-slate-200 cursor-pointer"
                    onMouseDown={() => {
                      setForm({ ...form, name: item });
                      setShowSuggestions(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <input
            className="bg-slate-50  p-2 rounded-md  text-slate-900 "
            placeholder="Quantity"
            type="text"
            value={form.quantity === 0 ? "" : form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: Number(e.target.value) })
            }
          />
          <select
            className="bg-slate-50 p-2 rounded-md text-slate-900 appearance-none cursor-pointer pr-8 bg-no-repeat bg-right"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundPosition: "right 10px center",
            }}
            value={form.unit}
            onChange={(e) =>
              setForm({ ...form, unit: e.target.value as Units })
            }
          >
            <option value="kg">kg</option>
            <option value="grams">grams</option>
            <option value="ml">ml</option>
            <option value="litre">litre</option>
          </select>
          <input
            className="bg-slate-50 p-2 rounded-md text-slate-900"
            placeholder="Price"
            type="text"
            value={form.totalCost === 0 ? "" : form.totalCost}
            onChange={(e) =>
              setForm({ ...form, totalCost: Number(e.target.value) })
            }
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
