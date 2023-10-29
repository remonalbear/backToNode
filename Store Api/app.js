const express = require('express');
const app = express();
require('dotenv').config()
const {errorHandler} = require('./controllers/errorHandler');
const {notFoundHandler} = require('./controllers/notFound');
const dbConnection = require('./DB/db')
const productsRouter = require('./routers/products');
//global Vars
const port = process.env.PORT || 3000
const DB_TOKEN = process.env.DB_TOKEN

//MW
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//static

//routes
app.use('/api/v1/products',productsRouter.router)
//not found urls
app.use(notFoundHandler);

//error handling
app.use(errorHandler);

const start = async () =>{
    try {
        await dbConnection(DB_TOKEN);  
        app.listen(port,() => {
            console.log('running');
        })
    } catch (error) {
        console.log("ERROR while connection :",error)
    }

}

//start the app and connect to db
start()
