import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Category } from "../entities/Category";
import { checkIfDefined } from "../util";
import { CategoryModel } from "../models/category.model";





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

    static async createCategory(model: CategoryModel){
        return await repo.save({
           name: model.name,
           createdAt: new Date()
        })

           
     }
  
     static async updateCategory(id: number, model: CategoryModel){
        const data = await this.getCategoryById(id)
        data.name= model.name,
        data.updatedAt = new Date()
  
        return await repo.save(data)
     }
     //treba da vrati status 204 kod
     static async deletecategoryById(id: number){
        const data = await this.getCategoryById(id)  
        data.deletedAt = new Date()
        await repo.save(data)
     }
 
}