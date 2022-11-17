import AppError from "../AppError";

export enum STATUS {
    SUCCESS = 200,
    NOT_FOUND = 404,
    NOT_AUTHORIZED = 401,
    SERVER_ERROR = 500,
    BAD_REQUEST = 400,
    FORBIDDEN = 403,
}

export const asyncHandler = (fn: any) => (req: any, res: any, next: any) => fn(req, res, next).catch(next);


export const sendResponse = (data: any, res: any, keepId = true) => {
    // if (status !== STATUS.SUCCESS) return res.status(status).json({ success: false, message: data });
    const response = data;


    const id = response._id;
    delete response['_id'];
    delete response['__v'];

    if (keepId) response['id'] = id;



    return res.status(STATUS.SUCCESS).send({ success: true, response });
};

export const sendError = (status: STATUS, message: string, next: any) => next(new AppError(message, status))

export const isValidMongoDbId = (id: String) => (/^[0-9a-fA-F]{24}$/).test(String(id))


