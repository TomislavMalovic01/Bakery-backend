import { Router } from "express";
import { handleRequest } from "../util";
import { ProductIngredientService } from "../services/productingredient.service";
import { IngredientService } from "../services/ingredient.service";




export const IngredientRoute = Router()

IngredientRoute.get('/', (req, res) => {
    handleRequest(res, IngredientService.getAllIngredient())
})