
import { DataSource } from "typeorm";
import { Category } from "./entities/Category";
import { Ingredient } from "./entities/Ingredient";
import { Product } from "./entities/Product";
import { ProductIngredient } from "./entities/ProductIngredient";
import { User } from "./entities/User";
import { configDotenv } from "dotenv";


configDotenv()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Category, Ingredient, Product, ProductIngredient, User],
    logging: false
})