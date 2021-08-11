import ErrorResponse from '../utils/error_response';

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    console.log(err.name)
    // mongoose duplicate error
    if (err.code == 11000) {
        const message = "Field already exists or duplicate value encountered";
        error = new ErrorResponse(message, 400);
    }

    // mongoose validation error
    if (err.name == "CastError") {
        const message = "Invalid parameter passed";
        error = new ErrorResponse(message, 400);
    }

    // mongoose validation error
    if (err.name == "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }
   
    res.status(error.status || 500).json({
        status: false,
        message: error.message || "Server error! request not completed"
    });
}

export default errorHandler;