export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  price: number;
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
