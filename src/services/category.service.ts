import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Category } from "../entities/Category";
import { NameModel } from "../models/name.model";




const repo = AppDataSource.getRepository(Category)

export class CatergoryServices{
    static async getAllCategory(){
        return await repo.find({
            select : {
                categoryId : true,
                name : true,
                createdAt : true,
                updatedAt : true,
                deletedAt :  true
            },
            
            where : {
                deletedAt : IsNull()
            }

        })
    }
 
}