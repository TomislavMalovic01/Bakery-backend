import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { Ingredient } from "../entities/Ingredient";

import { checkIfDefined } from "../util";
import { IngredientModel } from "../models/ingredient.model";





const repo = AppDataSource.getRepository(Ingredient)

export class IngredientService {
    static async getAllIngredient() { 
        return await repo.find({
            select : {
                name : true,
                isVegan : true,
                isVegeterian : true,
                createdAt : true,
                deletedAt : true,
                updatedAt  : true


            },
            where : {
               deletedAt : IsNull()
            }
        })
    }

    static async getIngredientByID(id: number) {
        const data = await repo.findOne({
           select: {
              ingredientId: true,
              name: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true
  
  
           },
  
           where: {
              ingredientId: id,
              deletedAt: IsNull()
           }
        })
  
        return checkIfDefined(data)
  
     }
  
     static async createIngredient(model: IngredientModel){
        return await repo.save({
           name: model.name,
           createdAt: new Date()
        })

           
     }
  
     static async updateIngredient(id: number, model: IngredientModel){
        const data = await this.getIngredientByID(id)
        data.name= model.name
        data.updatedAt = new Date()
  
        return await repo.save(data)
     }
     //treba da vrati status 204 kod
     static async deleteIngredientById(id: number){
        const data = await this.getIngredientByID(id)  
        data.deletedAt = new Date()
        await repo.save(data)
     }
  


}