import { Router } from "express";
import { handleRequest } from "../util";
import { ProductService } from "../services/product.service";



export const ProductRoute = Router()

ProductRoute.get('/', (req, res) => {
    handleRequest(res, ProductService.getAllProduct())
})


ProductRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, ProductService.getProductByID(id))
})

ProductRoute.post('/', (req, res) => {
    console.log(req.body)
    handleRequest(res, ProductService.createProduct(req.body))
    
})

ProductRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, ProductService.updateProduct(id, req.body)) //reuqust body odakle se izvlaci ovbaj nas model
})


ProductRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, ProductService.deleteDeviceById(id))
})


