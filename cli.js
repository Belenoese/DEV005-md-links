#!/usr/bin/env nodo

const { validate } = require('jest-validate');
const { mdLinks, generateStats } = require('./index.js');
const { colors } = require('colors');

const userInput = process.argv[2];
let optionsObj = {
    validate: false,
    stats: false,
  };
const options = process.argv;

if( options.includes('--validate') && (!options.includes('--stats'))){
    optionsObj.validate = true;
} else if (!options.includes('--validate') && (options.includes('--stats'))) {
    optionsObj.stats = true;
} else if (options.includes('--validate') && (options.includes('--stats'))) {
    optionsObj.validate = true;
    optionsObj.stats = true;
} else {
    optionsObj.validate = false;
    optionsObj.stats = false;
}

mdLinks(userInput, optionsObj)
.then((result) => {
    if (optionsObj.validate && optionsObj.stats) {
        const stats = generateStats(result);
        console.log('Total:'.brightMagenta, stats.total );
        console.log('Unique:'.brightGreen, stats.unique );
        console.log('Broken:'.brightRed, stats.broken );
    } else if (optionsObj.stats) {  
        const stats = generateStats(result);
        // const statsString = `Total: ${stats.total} Unique: ${stats.unique}`;
        console.log('Total:'.brightMagenta, stats.total );
        console.log('Unique:'.brightGreen, stats.unique );
    } else {
        console.log(result);
    }
})
.catch((error) => {
    console.log(error.message)
});

