import Router from "express";
import ingredientRoutes from "./ingredientRoutes.js";
import recipeRoutes from "./recipeRoutes.js";

const router = Router();

router.use("/ingredients", ingredientRoutes);
router.use("/recipes", recipeRoutes);

export default router;
