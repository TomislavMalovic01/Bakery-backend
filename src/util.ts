
import { configDotenv } from "dotenv";
import { Response } from "express";
import jwt from "jsonwebtoken"

export async function handleRequest(res: Response, callback: Promise<any>,) {
    try {
        const data = await callback
        console.log(data)
        if (data == undefined) {
            res.status(204).send()
            return

        }

        delete data.deletedAt
        res.json(data)
    } catch (e) {
        let code = 500
        if (e.message == "NOT_FOUND")
            code = 404

        res.status(code).json({ //ako je not found vrati 404 a u suprotnom vrati 500
            message: e.message,
            timesamp: new Date()
        })
    }
}

export function checkIfDefined<T>(data : T){
    if(data == undefined)
        throw new Error("NOT_FOUND")
    return data
}


configDotenv()
export async function authenticateToken(req, res, next) {

    const unprotected = [
        '/api/user/login',
        '/api/user/refresh'
        ]

        if(unprotected.includes(req.path)){
            next()
            return
        }

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
 
    if (token == null) {
        return sendErrorResponse(res, 401, 'NO_TOKEN')
    }
 
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, decoded: any) => {
        if (err) {
            return sendErrorResponse(res, 403, 'INVALID_TOKEN')
        }
        req.username = decoded.username
        next()
    })
}

export function sendErrorResponse(res: Response,code = 400, msg= "Bad request"){
    res.status(code).json({
        message: msg,
        timestamp: new Date()
    })
}


