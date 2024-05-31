import { Router } from "express";
import { handleRequest } from "../util";
import { ProductIngredientService } from "../services/productingredient.service";





export const ProductIngredientRoute = Router()

ProductIngredientRoute.get('/', (req, res) => {
    handleRequest(res, ProductIngredientService.getAllProductIngredient())
})


ProductIngredientRoute.get('/:id/simple', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res,ProductIngredientService.getProductIngredientWithoutRelationsById(id))
})

ProductIngredientRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res,ProductIngredientService.getProductingridentById(id))
})


ProductIngredientRoute.post('/', (req, res) => {
    handleRequest(res, ProductIngredientService.createProductIngredient(req.body))
})

ProductIngredientRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, ProductIngredientService.updateProductIngredient(id, req.body)) //reuqust body odakle se izvlaci ovbaj nas model
})


ProductIngredientRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, ProductIngredientService.deleteProductIngredientById(id))
})
