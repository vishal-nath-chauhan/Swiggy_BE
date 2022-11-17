const ErrorHandler = (err: any, re: any, res: any, next: any) => {
    let statusCode = err.statusCode || 500;

    if (err.name === 'ValidationError') {
        let errorMessages = Object.keys(err.errors);
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