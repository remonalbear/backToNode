require('express-async-errors');
const { filter } = require('lodash');
const Product  = require('../model/product')
const getProducts = async (req,res) => {
    const {featured, company,name,sort,select,limit,page,numericFilter} = req.query;
    const queryObject = {};
    let sortFilters = 'name';
    let limitVal = 20;
    let skipVal = 0;
    if(featured){
        queryObject.featured = featured === 'true' ? true : false;
    }

    if(company){
        queryObject.company = company;
    }

    if(name){
        queryObject.name = {$regex:name,$options:'i'};
    }
    if(sort){
        sortFilters = sort.split(',').join(' ');
    }
    if(limit){
        limitVal = limit;
    }
    if(page){
        skipVal = (Number(page) - 1) * Number(limitVal);
    }
    if(numericFilter)
    {
        const operatorMap = {
            '>' : "$gt",
            '>=' : "$gte",
            '=' : "$eq",
            '<' : "$et",
            '<=' : "$lte",
        }
        const regEX = /\b(<|<=|>|>=|=)\b/g;
        let filters = numericFilter.replace(regEX,
            (match) => {
                return `-${operatorMap[match]}-`;
            })    
        const filterOptions =['price','rating']
        filters = filters.split(',').forEach(filter => {
            const [field,operator,value] = filter.split('-');
            if(filterOptions.includes(field)){
                queryObject[field] = {[operator] : Number(value)}
            }
        }); 
    }
    let result = Product.find(queryObject);
    if(select){
        result = result.select(select);
    }
    result = result.sort(sortFilters).limit(limitVal).skip(skipVal);
    const products = await result;

    res.json({len:products.length,products});
}

const getProductsStatic = async (req,res) => {
    const products = await Product.find(); 
    res.json({len:products.length,products});
}
module.exports ={
    getProducts,
    getProductsStatic
}