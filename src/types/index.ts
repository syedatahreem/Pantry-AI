export interface IngredientsType {
  id: string;
  name: string;
  unit: Units;
  quantity: number;
  totalCost: number;
}

export type Units = "kg" | "grams" | "ml" | "litre";

export interface RecipeIngredient {
  ingredientId: string;
  quantityUsed: number;
}

export interface Recipe {
  id: string;
  name: string;
  servings: number;
  ingredients: RecipeIngredient[];
  costPerServing: number;
}

export type SavedRecipe = {
  id: string;
  name: string;
  servings: string;
  recipes: { id: string }[];
  costPerServing: number;
};

export type Pages = "dashboard" | "pantry" | "recipe-builder";
