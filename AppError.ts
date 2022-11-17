class AppError extends Error {

    statusCode: number;
    isOperational: boolean;

    constructor(message: any, statusCode: any) {
        super(message);
        this["statusCode"] = statusCode;
        this["isOperational"] = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError