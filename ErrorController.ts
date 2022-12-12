import { log } from "console";

const ErrorHandler = (err: any, re: any, res: any, next: any) => {
    let statusCode = err.statusCode || 500;




    if (err.code === 11000) {
        res.status(statusCode).json({
            success: false,
            message: "Duplicate Data Found"
        })
    }

    if (err.name === 'ValidationError') {
        let errorMessages = Object.keys(err.errors);
        console.log("CAME TO ERROR ", errorMessages);

        res.status(statusCode).json({
            success: false,
            message: "Invalid Keys : " + errorMessages.join(" ")
        })
    }

    res.status(statusCode).json({
        success: false,
        message: err.message
    })


}
export default ErrorHandler