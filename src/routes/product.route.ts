import { Router } from "express";
import { handleRequest } from "../util";
import { ProductService } from "../services/product.service";



export const ProductRoute = Router()

ProductRoute.get('/', (req, res) => {
    handleRequest(res, ProductService.getAllProduct())
})

