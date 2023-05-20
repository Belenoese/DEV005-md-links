const fs = require('fs');
const { existsPath } = require('./functions.js');


const mdLinks = (path, options) => {
  return new Promise((resolve, reject)=> {
    // Identifica si existe una ruta en caso contrario rechazar la promesa
    if (existsPath(path)) {
      // Probar si la ruta es archivo o directorio

    } else {
      // Si no existe la ruta se rechaza la promesa
    reject('La ruta no existe')
    }
    // Comprobar si es una ruta absoluta
    // const absolutePath = path.isAbsolute(path);
    // if(absolutePath) {
    //   console.log('Ruta absoluta');
    // } else {
    //   console.log('Ruta relativa');
    // }
  });
};

module.exports = {
  mdLinks
};