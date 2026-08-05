import prisma from "../lib/prisma.js";

export function listIngredients(userId: string) {
  return prisma.ingredient.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export function createIngredient(
  userId: string,
  data: {
    name: string;
    quantity: number;
    unit: string;
    totalCost: number;
  },
) {
  return prisma.ingredient.create({
    data: { ...data, userId },
  });
}

export function deleteIngredient(id: string) {
  return prisma.ingredient.delete({ where: { id } });
}
