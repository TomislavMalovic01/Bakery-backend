import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { ProductIngredient } from "../entities/ProductIngredient";
import { checkIfDefined } from "../util";
import { ProductIngredientModel } from "../models/productingredient.model";

const repo = AppDataSource.getRepository(ProductIngredient);

export class ProductIngredientService {

    static async getAllProductIngredient() {
        const data = await repo.find({
            select: {
                productId: true,
                ingredientId: true,
                createdAt: true,
                updatedAt: true,
                product: {
                    productId: true,
                    name: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true
                },
                ingredient: {
                    ingredientId: true,
                    name: true,
                    isVegan: true,
                    isVegeterian: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true
                }
            },
            where: {
                product: {
                    deletedAt: IsNull()
                },
                ingredient: {
                    deletedAt: IsNull()
                },
                deletedAt: IsNull()
            },
            relations: {
                product: true,
                ingredient: true
            }
        });

        const productMap = new Map<number, any>();

        data.forEach(singleData => {
            const productId = singleData.product.productId;
            if (!productMap.has(productId)) {
                productMap.set(productId, {
                    productId: productId,
                    productName: singleData.product.name,
                    ingredients: [],
                    isVegan: true,
                    isVegeterian: true,
                    deletedAt: null,
                    updatedAt: singleData.product.updatedAt,
                    createdAt: singleData.product.createdAt
                });
            }

            const productData = productMap.get(productId);

            if (singleData.ingredient.isVegan == 0) {
                productData.isVegan = false;
            }

            if (singleData.ingredient.isVegeterian == 0) {
                productData.isVegeterian = false;
            }

            productData.ingredients.push(singleData.ingredient);
        });

        return Array.from(productMap.values()).map(checkIfDefined);
    }




    static async getProductIngredientById(id: number) {
        const data = await repo.find({
            select: {
                product: {
                    productId: true,
                    name: true,
                    image:true,
                    description:true,
                    energyValiue:true,
                    categoryId:true,
                    price:true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
                },
                ingredient: {
                    ingredientId: true,
                    name: true,
                    isVegan: true,
                    isVegeterian: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true
                }
            },
            where: {
                product: {
                    productId: id,
                    deletedAt: IsNull()
                },
                ingredient: {
                    deletedAt: IsNull()
                },
                deletedAt: IsNull()
            },
            relations: {
                product: true,
                ingredient: true
            }


        });

        const returnData = {
            productId: data[0].productId,
            productName: data[0].product.name,
            image:data[0].product.image,
            description:data[0].product.description,
            price:data[0].product.price,
            
            categoryId:data[0].product.categoryId,
            ingredients: [],
            isVegan: true,
            isVegeterian: true,
            deletedAt: null,
            updatedAt: new Date(),
            createdAt: new Date()
        };


        data.forEach(singleData => {
            if (singleData.ingredient.isVegan == 0) {
                returnData.isVegan = false;
            }

            if (singleData.ingredient.isVegeterian == 0) {
                returnData.isVegeterian = false;
            }
            returnData.ingredients.push(singleData.ingredient);
        });


        return checkIfDefined(returnData);
    }




    static async createProductIngredient(model: ProductIngredientModel) {
        return await repo.save({
            productId: model.productId,
            ingredientId: model.ingredientId,
            createdAt: new Date()
        })

    }


    static async getProductIngredientByBothId(productId: number, oldIngredientId: number) {
        const data = await repo.findOne({
            select: {
                productId: true,
                ingredientId: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                productId: productId,
                ingredientId: oldIngredientId,
                deletedAt: IsNull()
            }



        });

        return data
    }


    static async updateProductIngredient(productId: number, oldIngredientId: number, model: any) {
        // Pronađi zapis sa starim ingredientId
        console.log("bEKEND SERVIS", productId, oldIngredientId, model);
        const oldData = await this.getProductIngredientByBothId(productId, oldIngredientId);

        console.log("Bekend Data", oldData);
        if (!oldData) {
            throw new Error("Old data not found");
        }

        // Pronađi postojeći zapis sa novim ingredientId, ako postoji
        const existingData = await repo.findOne({
            where: {
                productId: productId,
                ingredientId: model.ingredientId
            }
        });

        if (existingData) {
            throw new Error("Combination of productId and ingredientId already exists");
        }

        // Obriši stari zapis
        await repo.remove(oldData);

        // Kreiraj novi zapis
        const newData = new ProductIngredient();
        newData.productId = model.productId;
        newData.ingredientId = model.ingredientId;
        newData.createdAt = oldData.createdAt;
        newData.updatedAt = new Date();

        console.log("Bekend Data posle", newData);

        return await repo.save(newData);
    }





    //treba da vrati status 204 kod
    static async deleteProductIngredientById(id: number) {
        const data = await repo.find({
            where: {
                productId: id,
                deletedAt: IsNull()
            }
        })

        data.forEach(d => {
            d.deletedAt = new Date()
        })
        return await repo.save(data)


    }


    static async deleteProductIngredientInEdit(productId: number, oldIngredientId: number) {
        const data = await repo.findOne({
            where: {
                productId: productId,
                ingredientId: oldIngredientId,
                deletedAt: IsNull()
            }
        })


        console.log(data)
        data.deletedAt = new Date()
        return await repo.save(data)



    }
}



