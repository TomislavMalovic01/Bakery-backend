import { userInfo } from "os";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { IsNull } from "typeorm";





const repo = AppDataSource.getRepository(User)


export class UserService {
    static async getAllUsers(){
        return await repo.find({
            select : {
                userId : true,
                username : true,
                createdAt : true,
                deletedAt : true
            },
            where : {
                deletedAt : IsNull()
            }

        })
    }
}