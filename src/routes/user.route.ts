import { Router } from "express";
import { handleRequest } from "../util";
import { UserService } from "../services/user.service";



export const UserRoute = Router()

UserRoute.get('/', (req, res) => {
    handleRequest(res, UserService.getAllUsers())
})


UserRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, UserService.getUserById(id))
})

UserRoute.post('/', (req, res) => {
    handleRequest(res, UserService.createUser(req.body))
})

UserRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, UserService.updateUser(id, req.body)) //reuqust body odakle se izvlaci ovbaj nas model
})


UserRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number
    handleRequest(res, UserService.deleteCustomerById(id))
})