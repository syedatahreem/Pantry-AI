import type { Request, Response } from "express";
import * as ingredientService from "../services/ingredientService.js";
import { DEV_USER_ID } from "../constants/devUser.js";

const userId = DEV_USER_ID;

export async function getIngredients(_req: Request, res: Response) {
  const ingredients = await ingredientService.listIngredients(userId);
  res.json(ingredients);
}

export async function createIngredient(req: Request, res: Response) {
  const { name, quantity, unit, totalCost } = req.body;

  if (!name || quantity == null || !unit || totalCost == null) {
    res.status(400).json({ error: "name, quantity, unit, and totalCost are required" });
    return;
  }

  const ingredient = await ingredientService.createIngredient(userId, {
    name,
    quantity,
    unit,
    totalCost,
  });
  res.status(201).json(ingredient);
}

export async function deleteIngredient(req: Request, res: Response) {
  const { id } = req.params;
  if (typeof id !== "string") {
    res.status(400).json({ error: "id is required" });
    return;
  }
  await ingredientService.deleteIngredient(id);
  res.status(204).send();
}
