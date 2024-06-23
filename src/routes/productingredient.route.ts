import { Router } from "express";
import { handleRequest } from "../util";
import { ProductIngredientService } from "../services/productingredient.service";





export const ProductIngredientRoute = Router()

ProductIngredientRoute.get('/', (req, res) => {
    handleRequest(res, ProductIngredientService.getAllProductIngredient())
})



ProductIngredientRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res,ProductIngredientService.getProductIngredientById(id))
})


ProductIngredientRoute.post('/', (req, res) => {
    handleRequest(res, ProductIngredientService.createProductIngredient(req.body))
})

ProductIngredientRoute.put('/:productId/:ingredientId', (req, res) => {
    const productId = req.params.productId as any as number
    const ingredientId = req.params.ingredientId as any as number
    console.log("BACK RUTE", productId, ingredientId, req.body)
    handleRequest(res, ProductIngredientService.updateProductIngredient(productId,ingredientId, req.body)) //reuqust body odakle se izvlaci ovbaj nas model
})


ProductIngredientRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, ProductIngredientService.deleteProductIngredientById(id))
})

ProductIngredientRoute.delete('/delete/:productId/:oldIngredientId', (req, res) => {
    const productId = req.params.productId as any as number
    const oldIngredientId = req.params.oldIngredientId as any as number
    handleRequest(res, ProductIngredientService.deleteProductIngredientInEdit(productId, oldIngredientId))
})
