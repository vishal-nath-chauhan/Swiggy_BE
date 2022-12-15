import { isValidMongoDbId, STATUS, sendError } from "./common.helper";
import * as jwt from 'jsonwebtoken'
import Users from "../models/users.schema";

interface JwtPayload {
    id: string
}


export const validateMongoID = (req: any, res: any, next: any) => {
    const { id } = req.query;
    let isValidId = isValidMongoDbId(id);

    if (!id || !isValidId) return sendError(STATUS.BAD_REQUEST, 'Invalid Id', next)
    if (isValidId) next()
}


export const getUserFromHeader = async (headers: any, next: any) => {

    const { authorization } = headers;
    if (!authorization) return sendError(STATUS.NOT_AUTHORIZED, "You must be loggedIn ", next)

    const token = authorization.split("Bearer ")[1]
    const secret = String(process.env.JWT_SECRET)

    const isVerified = await jwt.verify(token, secret) as JwtPayload
    if (isVerified) {
        const user = await Users.findById({ _id: isVerified.id })
        return user
    }
}