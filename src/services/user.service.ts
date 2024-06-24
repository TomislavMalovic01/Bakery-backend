import { userInfo } from "os";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { IsNull } from "typeorm";
import { UserModel } from "../models/user.model";
import { checkIfDefined } from "../util";
import { configDotenv } from "dotenv";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { match } from "assert";




const repo = AppDataSource.getRepository(User)

configDotenv()
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const accessExpire = process.env.ACCESS_TOKEN_TTL;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshExpire = process.env.REFRESH_TOKEN_TTL;

export class UserService {
    static async login(model: UserModel) {
        const user = await this.getUserByUsername(model.username)
        const matches = await bcrypt.compare(model.password, user.password)
        if(matches){
            return{
            username: user.username, 
            access: jwt.sign({username: user.username}, accessSecret, {expiresIn: accessExpire}),
            refresh: jwt.sign({username: user.username}, refreshSecret, {expiresIn: refreshExpire}),
            };
        }
        throw new Error("BAD_CREDENTIALS")

    }

    public static async refreshToken(refresh: string){
        try{
            const decoded: any = jwt.verify(refresh,refreshSecret as string)
            return {
                username: decoded.username,
                access: jwt.sign({username: decoded.username},accessSecret,{expiresIn: accessExpire}),
                refresh: refresh  //dokle god se ne ulogujemo ponovo refresh je uvek isti
            }
        }catch(err){
            throw new Error("REFRESH_FAILED");
        }
    }

    static async getUserByUsername(username: string) {
        const data = await repo.findOne({
            where: {
                username: username
            }
        })
        return checkIfDefined(data)
    }
}
