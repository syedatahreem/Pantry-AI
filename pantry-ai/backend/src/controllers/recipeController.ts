import type { Request, Response } from "express";
import * as recipeService from "../services/recipeService.js";
import { DEV_USER_ID } from "../constants/devUser.js";

const userId = DEV_USER_ID;

export async function getRecipes(_req: Request, res: Response) {
  const recipes = await recipeService.listRecipes(userId);
  res.json(recipes);
}

export async function createRecipe(req: Request, res: Response) {
  const { name, servings, costPerServing, ingredients } = req.body;

  if (!name || servings == null || costPerServing == null || !Array.isArray(ingredients)) {
    res.status(400).json({
      error: "name, servings, costPerServing, and ingredients[] are required",
    });
    return;
  }

  const recipe = await recipeService.createRecipe(userId, {
    name,
    servings,
    costPerServing,
    ingredients,
  });
  res.status(201).json(recipe);
}

export async function deleteRecipe(req: Request, res: Response) {
  const { id } = req.params;
  if (typeof id !== "string") {
    res.status(400).json({ error: "id is required" });
    return;
  }
  await recipeService.deleteRecipe(id);
  res.status(204).send();
}
