const errorHandler = (err,req,res,next) => {
    console.log(err)
    res.status(500).send({msg:"Error dedicted from the error handler"});
}

exports.errorHandler = errorHandler;