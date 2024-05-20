import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { ProductIngredient } from "../entities/ProductIngredient";






const repo = AppDataSource.getRepository(ProductIngredient)

export class ProductIngredientService {

    static async getAllProductIngredient() {
        return await repo.find({
            select: {
                productId: true,
                ingredientId: true,
                product: {
                    name: true,
                    description: true,
                    unit: true,
                    price: true,
                    energyValiue: true,
                    categoryId: true,
                    createdAt: true,

                },
                ingredient: {
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
                    deleteAt: IsNull()
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
                    name: true
                },
                ingredient: {
                    ingredientId: true,
                    name: true,
                    isVegan: true,
                    isVegeterian: true

                }

            },
            where: {
                product: {
                    productId: id,
                    deletedAt: IsNull()
                },
                ingredient: {
                    //isVegan true za sranje
                    deleteAt: IsNull()
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
            isVegeterian : true
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

        return returnData



    }

}


