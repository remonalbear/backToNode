const names = require('./names.js'); 
const utiles = require('./utilis.js'); 
const http = require('http')
// const test = 10

// if(test == 10)
// {
//     // console.log(__dirname,'\n');
//     // console.log(__filename,'\n');
//     // console.log(process,'\n');
//     // console.log(module,'\n');
// }
// // setInterval(() => {
// //     console.log('back to basics')
// // }, 1000);



// utiles.sayHi(names.remon)
// utiles.sayHi(names.secret)

const server = http.createServer((req,res) => {

    res.write('welcome');
    res.end();
});

server.listen(5000); 