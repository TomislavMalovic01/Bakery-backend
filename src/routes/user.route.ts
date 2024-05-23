import { Router } from "express";
import { handleRequest } from "../util";
import { UserService } from "../services/user.service";



export const UserRoute = Router()

UserRoute.get('/', (req, res) => {
    handleRequest(res, UserService.getAllUsers())
})