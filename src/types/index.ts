export interface IngredientsType {
  id: string;
  name: string;
  unit: string;
  quantity: string;
  totalCost: string;
}

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

export type Pages = "dashboard" | "pantry" | "recipe-builder";
