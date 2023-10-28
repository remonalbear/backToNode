const Express = require('express');
const app = Express();
const db = require('./db/connect');
const taskRouter =require('./routes/task')
const errorHandler = require('./errorHandler')
require('dotenv').config()
//consts
const port = process.env.PORT || 3000;
const connectionString = process.env.DB_URL
//
//static
app.use(Express.static('./public'));

//middleware
app.use(Express.json());//json files
app.use(Express.urlencoded({extended:false})); //post requests

//routes
app.use('/api/v1/tasks',taskRouter.router);

app.use((req,res) => {
    res.status(404).send('<h1>NOT FOUND!!</h1>')
})
 
app.use(errorHandler);

db.connect(connectionString)
    .then(() => {
        console.log('conecting to db')
        app.listen(port,() => {
            console.log('listing...');
        })
    })
    .catch((err) => {
        console.log('error in connection with db : '+err);
    });;

