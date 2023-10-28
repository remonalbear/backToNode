const {CustomError} = require('./Error/customError')

const errorHandler = (err,req,res,next) => {
    if(err instanceof CustomError){
        return res.status(err.status).json({msg:err.message});        
    }
    return res.status(500).json({msg:'we got error in the errorHandler wrapper'});
}

module.exports = errorHandler;