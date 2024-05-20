import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Product } from "../entities/Product";




const repo = AppDataSource.getRepository(Product)

export class ProductService{

     static async getAllProduct(){
        return await repo.find({
            select : {

               productId : true,
               name : true,
               description : true,
               unit : true,
               price  : true,
               energyValiue : true,
               categoryId : true,
               createdAt : true,
             
            },
            where :  {
               deletedAt : IsNull()
            }
         
        })
        
     }


     static async getProductById(id : number){
      return await repo.find ({
         select : {
            productId : true
         }
      })
     }
     
}