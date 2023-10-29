const dbConnection = require('./DB/db');
const Product = require('./model/product')
require('dotenv').config();

const products = require('./products.json')

const populate = async () => {
    try{
        await dbConnection(process.env.DB_TOKEN);
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log("finish inserting many products");
        process.exit(0);
    }catch(Error){
        console.log("ERROR"+Error);
        process.exit(1);
    }
}

populate();