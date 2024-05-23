import { Router } from "express";
import { handleRequest } from "../util";
import { ProductIngredientService } from "../services/productingredient.service";





export const ProductIngredientRoute = Router()

ProductIngredientRoute.get('/', (req, res) => {
    handleRequest(res, ProductIngredientService.getAllProductIngredient())
})


ProductIngredientRoute.get('/product/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res,ProductIngredientService.getProductingridentById(id))
})