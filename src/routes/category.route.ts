import { Router } from "express";
import { handleRequest } from "../util";
import { CatergoryServices } from "../services/category.service";






export const CategoryRoute = Router()

CategoryRoute.get('/' , (req, res) =>  {
    handleRequest(res, CatergoryServices.getAllCategory())
})

CategoryRoute.get('/:id' , (req, res) =>  {
    const id = req.params.id as any as number
    handleRequest(res, CatergoryServices.getCategoryById(id))
})

CategoryRoute.post('/', (req, res) => {
    handleRequest(res, CatergoryServices.createCategory(req.body))
})

CategoryRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, CatergoryServices.updateCategory(id, req.body)) //reuqust body odakle se izvlaci ovbaj nas model
})


CategoryRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, CatergoryServices.deletecategoryById(id))
})