import { userInfo } from "os";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { IsNull } from "typeorm";
import { UserModel } from "../models/user.model";
import { checkIfDefined } from "../util";





const repo = AppDataSource.getRepository(User)


export class UserService {
    static async getAllUsers() {
        return await repo.find({
            select: {
                userId: true,
                username: true,
                password: true,
                createdAt: true,
                deletedAt: true,
                updatedAt: true
            },
            where: {
                deletedAt: IsNull()
            }

        })
    }

    static async getUserById(id: number) {
        const data = await repo.findOne({
            select: {
                userId: true,
                username: true,
                password: true,
                createdAt: true,
                deletedAt: true
            },
            where: {
                userId: id,
                deletedAt: IsNull()
            }
        })
        return checkIfDefined(data)
    }


    static async createUser(model: UserModel) {
        return await repo.save({
            username: model.username,
            password: model.password,
            createdAt: new Date()
        })

    }

    static async updateUser(id: number, model: UserModel) {
        const data: User = await this.getUserById(id);
        data.username = model.username
        data.password = model.password
        data.createdAt = new Date()
        data.updatedAt = new Date()

        return await repo.save(data)
    }



    static async deleteCustomerById(id: number) {
        const data = await this.getUserById(id);
        data.deletedAt = new Date()
        await repo.save(data)
    }


}