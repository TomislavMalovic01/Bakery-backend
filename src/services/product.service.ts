import { IsNull, Like } from "typeorm";
import { AppDataSource } from "../db";
import { Product } from "../entities/Product";
import { checkIfDefined } from "../util";
import { ProductModel } from "../models/product.model";




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
            updatedAt: true,
            image:true

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
            description: true,
            unit: true,
            price: true,
            image:true,
            energyValiue: true,
            categoryId: true,
            createdAt: true,
            updatedAt:true,


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

      return checkIfDefined(data)

   }


   static async getProductWithoutRelationsById(id: number) {
      const data = await repo.findOne({
         select: {
            productId: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            categoryId : true


         },

         where: {
            productId: id,
            deletedAt: IsNull()
         }
      })

      return checkIfDefined(data)

   }

   static async createProduct(model: ProductModel){
      return await repo.save ({
         name : model.name,
         description : model.description,
         price:model.price,
         unit:model.unit,
         energyValiue:model.energyValiue,
         categoryId:model.categoryId,
         image:model.image,
         createdAt : new Date()
      })

      
         
   }

   static async updateProduct(id: number, model: ProductModel){
      const data : Product = await this.getProductWithoutRelationsById(id)
      data.name = model.name,
      data.description = model.description,
      data.price = model.price,
      data.unit = model.unit,
      data.energyValiue = model.energyValiue,
      data.categoryId = model.categoryId,
      data.createdAt = new Date()
      data.updatedAt = new Date()

      return await repo.save(data)
   
   }



   static async deleteDeviceById(id: number){
      const data : Product = await this.getProductWithoutRelationsById(id)
      data.deletedAt = new  Date()

      await repo.save(data)
   }


   static async getProductByName(name: string) {
      return await repo.findOne({
         select: {
            productId: true,
            name: true,
            description: true,
            unit: true,
            price: true,
            energyValiue: true,
            image:true,
            categoryId: true,
            createdAt: true,
            updatedAt: true
         },
         where: {
            name: Like(`%${name}%`),
            deletedAt: IsNull()
         }
      });
   }




}





