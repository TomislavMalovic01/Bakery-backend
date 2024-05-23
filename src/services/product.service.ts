import { IsNull, useContainer } from "typeorm";
import { AppDataSource } from "../db";
import { Product } from "../entities/Product";
import { isNull } from "util";
import { NameModel } from "../models/name.model";




const repo = AppDataSource.getRepository(Product)

export class ProductService {

   static async getAllProduct() {
      return await repo.find({
         select: {

            productId: true,
            name: true,
            description: true,
            unit: true,
            price: true,
            energyValiue: true,
            categoryId: true,
            createdAt: true,

         },
         where: {
            deletedAt: IsNull()
         }

      })




   }


   static async getProductByID(id: number) {
      const data = await repo.findOne({
         select: {
            productId: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,

            category: {
               categoryId: true,
               name: true,
               createdAt: true
            }


         },

         where: {
            productId: id,
            deletedAt: IsNull()
         },
         relations: {
            category: true
         }
      })

      if(data == undefined) {
         throw new Error("NOT_FOUND")
     }
      return data

   }

   static async createProduct(model: NameModel){
      return await repo.save({
         name: model.name,
         createdAt: new Date()
      })
         
   }

   static async updateProduct(id: number, model: NameModel){
      const data = await this.getProductByID(id)
      data.name= model.name
      data.updatedAt = new Date()
      return await repo.save(data)
   }
   //treba da vrati status 204 kod
   static async deleteProductById(id: number){
      const data = await this.getProductByID(id)  
      data.deletedAt = new Date()
      await repo.save(data)
   }






}





