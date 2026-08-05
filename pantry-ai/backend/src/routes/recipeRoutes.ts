import { Router } from "express";
import { getRecipes, createRecipe, deleteRecipe } from "../controllers/recipeController.js";

const router = Router();

router.get("/", getRecipes);
router.post("/", createRecipe);
router.delete("/:id", deleteRecipe);

export default router;
