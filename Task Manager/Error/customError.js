class CustomError extends Error{
    constructor(message,status){
        super(message);
        this.status=status;
    }
}

const creatCustomError = (msg,status) => {
    return new CustomError(msg,status);
}

module.exports = {creatCustomError,CustomError};