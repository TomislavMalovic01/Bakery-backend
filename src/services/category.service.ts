import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Category } from "../entities/Category";
import { checkIfDefined } from "../util";





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

    static async getCategoryById(id : number){
        const data = await repo.findOne({
            select : {
                categoryId : true,
                name : true,
                createdAt : true,
                updatedAt : true,
                deletedAt :  true
            },
            
            where : {
                categoryId : id,
                deletedAt : IsNull()
            }

        })

     return checkIfDefined(data)
    }
 
}