const _ = require('lodash'); // lodash module



const sayHi = (name) => {
    console.log(`say hi to ${name}`);
}

module.exports = {sayHi , ...module.exports};