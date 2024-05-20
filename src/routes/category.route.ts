import { Router } from "express";
import { handleRequest } from "../util";
import { CatergoryServices } from "../services/category.service";






export const CategoryRoute = Router()

CategoryRoute.get('/' , (req, res) =>  {
    handleRequest(res, CatergoryServices.getAllCategory())
})