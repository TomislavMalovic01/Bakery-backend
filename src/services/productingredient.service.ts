import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { ProductIngredient } from "../entities/ProductIngredient";
import { checkIfDefined } from "../util";
import { ProductIngredientModel } from "../models/productingredient.model";
import { DataSource } from "typeorm/browser";











const repo = AppDataSource.getRepository(ProductIngredient)

export class ProductIngredientService {

    static async getAllProductIngredient() {
        return await repo.find({
            select: {
                productId: true,
                ingredientId: true,
                product: {
                    productId: true,
                    name: true,
                    description: true,
                    unit: true,
                    price: true,
                    energyValiue: true,
                    categoryId: true,
                    createdAt: true,

                },
                ingredient: {
                    ingredientId: true,
                    name: true,
                    isVegan: true,
                    isVegeterian: true,
                    createdAt: true,

                }

            },
            where: {
                product: {
                    deletedAt: IsNull()
                },
                ingredient: {
                    deletedAt: IsNull()
                }
            },
            relations: {
                product: true,
                ingredient: true
            }

        })
    }




    static async getProductingridentById(id: number) {
        const data = await repo.find({
            select: {

                product: {
                    productId: true,
                    name: true,
                    createdAt : true,
                    updatedAt : true,
                    deletedAt:  true
                },
                ingredient: {
                    ingredientId: true,
                    name: true,
                    isVegan: true,
                    isVegeterian: true,
                    createdAt : true,
                    updatedAt : true,
                    deletedAt:  true

                }

            },
            where: {
                product: {
                    productId: id,
                    deletedAt: IsNull()
                },
                ingredient: {
                    //isVegan true za sranje
                    deletedAt: IsNull()
                }
            },
            relations: {
                product: true,
                ingredient: true
            }


        })

    


        const returnData = {
            productId: data[0].productId,
            productName: data[0].product.name,
            ingredients: [],
            isVegan : true,
            isVegeterian : true,
            deletedAt: null,
            updatedAt : new Date()
        }
        data.forEach(singleData => {
            if(singleData.ingredient.isVegan == 0){
                returnData.isVegan = false
            }

            if(singleData.ingredient.isVegeterian == 0){
                returnData.isVegeterian = false
            }
            returnData.ingredients.push(singleData.ingredient
            )
        })

        return checkIfDefined(returnData)
        


    }

    static async createProductIngredient(model: ProductIngredientModel){
        const returnData =  await repo.save({
           name: model.name,
           createdAt: new Date(),
           productId: model.productId,
           ingredientId : model.ingredientId
        })
  
        delete returnData.deletedAt;
        return returnData
  
    
           
     }

     static async getProductIngredientWithoutRelationsById(id: number){
        const returnData = await repo.findOne({
            select: {
                
                ingredientId : true,
                productId : true,
                createdAt : true,
                updatedAt : true,

                },

            
            where: {
                product: {
                    productId: id,
                    deletedAt: IsNull()
                },
                ingredient: {
                    //isVegan true za sranje
                    deletedAt: IsNull()
                }
            },
            relations: {
                product: true,
                ingredient: true
            }

         
        })

        return checkIfDefined(returnData)
        
     }
  
     static async updateProductIngredient(id: number, model: ProductIngredientModel){
        const returnData = await this.getProductIngredientWithoutRelationsById(id)
        returnData.name = model.name
        returnData.updatedAt = new Date()
        returnData.productId = model.productId
        returnData.ingredientId = model.ingredientId

        const newData = await repo.save(returnData)
        delete newData.deletedAt
        return newData
   
     }


     //treba da vrati status 204 kod
     static async deleteProductIngredientById(id: number){
        const returnData = await this.getProductIngredientWithoutRelationsById(id)
        returnData.deletedAt = new Date()
        await repo.save(returnData)
     
   
     }
  
  
  

}


