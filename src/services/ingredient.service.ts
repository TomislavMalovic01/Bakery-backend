import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { Ingredient } from "../entities/Ingredient";





const repo = AppDataSource.getRepository(Ingredient)

export class IngredientService {
    static async getAllIngredient() { 
        return await repo.find({
            select : {
                name : true,
                isVegan : true,
                isVegeterian : true,
                createdAt : true,
                deleteAt : true,
                updatedAt  : true


            },
            where : {
                deleteAt : IsNull()
            }
        })
    }


}