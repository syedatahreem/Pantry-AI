import prisma from "../lib/prisma.js";

const withIngredients = {
  include: { ingredients: { include: { ingredient: true } } },
} as const;

export function listRecipes(userId: string) {
  return prisma.recipe.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    ...withIngredients,
  });
}

export function createRecipe(
  userId: string,
  data: {
    name: string;
    servings: number;
    costPerServing: number;
    ingredients: { ingredientId: string; quantityUsed: number }[];
  },
) {
  return prisma.recipe.create({
    data: {
      name: data.name,
      servings: data.servings,
      costPerServing: data.costPerServing,
      userId,
      ingredients: {
        create: data.ingredients.map((item) => ({
          ingredientId: item.ingredientId,
          quantityUsed: item.quantityUsed,
        })),
      },
    },
    ...withIngredients,
  });
}

export function deleteRecipe(id: string) {
  return prisma.recipe.delete({ where: { id } });
}
