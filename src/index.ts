import cors from "cors";
import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./db";
import { configDotenv } from "dotenv";
import { Product } from "./entities/Product";
import { ProductService } from "./services/product.service";
import { ProductRoute } from "./routes/product.route";
import { CategoryRoute } from "./routes/category.route";
import { ProductIngredientService } from "./services/productingredient.service";





const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

configDotenv()
AppDataSource.initialize().then(() => {
    console.log('Connected to database')
    const port = process.env.SERVER_PORT || 4000 
    app.listen(port, () => {
        console.log("Listening on port" + port)
    })

}).catch((e) => console.log(e));


app.get('/', async (req, res) => {
    res.json(await ProductIngredientService.getProductingridentById(1))
})


app.use('/api/product', ProductRoute)
app.use('/api/category', CategoryRoute)



const resNotFound = (req, res) => {
    res.status(404).json({
        message: "Not found"
    })
}

app.get("*", resNotFound)
app.post("*", resNotFound) 
app.put("*", resNotFound)
app.delete("*", resNotFound)






