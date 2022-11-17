import { isValidMongoDbId, STATUS, sendError } from "./common.helper";

export const validateMongoID = (req: any, res: any, next: any) => {
    const { id } = req.query;
    let isValidId = isValidMongoDbId(id);

    if (!id || !isValidId) return sendError(STATUS.BAD_REQUEST, 'Invalid Id', next)
    if (isValidId) next()
}
