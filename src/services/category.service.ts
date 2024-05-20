import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Category } from "../entities/Category";




const repo = AppDataSource.getRepository(Category)

export class CatergoryServices{
    static async getAllCategory(){
        return await repo.find({
            select : {
                categoryId : true,
                name : true,
                createdAt : true
            },
            
            where : {
                deletedAt : IsNull()
            }

        })
    }
}