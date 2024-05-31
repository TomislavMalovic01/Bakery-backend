import { Router } from "express";
import { handleRequest } from "../util";
import { ProductIngredientService } from "../services/productingredient.service";
import { IngredientService } from "../services/ingredient.service";




export const IngredientRoute = Router()

IngredientRoute.get('/', (req, res) => {
    handleRequest(res, IngredientService.getAllIngredient())
})

IngredientRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, IngredientService.getIngredientByID(id))
})

IngredientRoute.post('/', (req, res) => {
    handleRequest(res, IngredientService.createIngredient(req.body))
})

IngredientRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, IngredientService.updateIngredient(id, req.body)) //reuqust body odakle se izvlaci ovbaj nas model
})


IngredientRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, IngredientService.deleteIngredientById(id))
})