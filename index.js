const fs = require('fs');
const { existsPath, absolutePath, readDirectory } = require('./functions.js');
const { lightblue } = require('color-name');


const mdLinks = (path, options) => {
  return new Promise((resolve, reject)=> {
    // Identify if a route exists otherwise reject the pledge
    if (existsPath(path)) {
    // Identify if the path is relative in order to convert it into an absolute path
    const absPath = (absolutePath(path)) 
    // Search for links in .md files
    const linksFileMd = (readDirectory(absPath))
    resolve(linksFileMd);
  } else {
    reject(new Error('La Ruta no existe'));
  }
    }
  )};


module.exports = {
  mdLinks
};