const fs = require('fs');
const path = require('path');
 
// seeing if the route exists
const existsPath = (route) => {
  if (fs.existsSync(route)) {
    console.log('La ruta existe.');
    return true;
  } else {
    console.log('La ruta no existe.');
    return false;
  }
};
//existsPath('carpeta-prueba/archivo-prueba.txt');

// Verifying if the path is absolute, if not, we convert the relative path into absolute
const absolutePath = (route) => {
  if (path.isAbsolute(route)) {
    console.log('Ruta absoluta',route);
    return route;
  } else {
    console.log('Ruta relativa convertida en absoluta', path.resolve(route));
    return path.resolve(route);
  }
}
absolutePath('carpeta-prueba/sub-carpeta')

// Read file
const readFile = fs.readFile('C:/Users/belen/Desktop/Laboratoria/DEV005-md-links/carpeta-prueba/archivo-prueba.txt', 'utf8', (error, data) => {
    if (error) {
      console.error('No se puede leer el archivo');
      return;
    }
  
    console.log(data);
  });

// File extension
const filePath = 'C:/Users/belen/Desktop/Laboratoria/DEV005-md-links/carpeta-prueba/archivo-prueba.txt';
const extension = path.extname(filePath);

console.log(extension); // Resultado: ".js"

// Read directory

const readDirectory = (directory) => {
try {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    // linking routes to make them absolute
    const absolutePath = path.join(directory,file);
    const stats = fs.statSync(absolutePath);
    if (stats.isDirectory()) {
      readDirectory(absolutePath);
    } else {
      console.log(absolutePath);
    }
  });
} catch (error) {
  console.error('Error al leer el directorio');
}
};
readDirectory('C:/Users/belen/Desktop/Laboratoria/DEV005-md-links/carpeta-prueba');

// Join two routes
// const ruta1 = 'carpeta-prueba';
// const ruta2 = 'archivo-prueba2.txt';

// const rutaCompleta = path.join(ruta1, ruta2);
// console.log(rutaCompleta);

module.exports = { existsPath, readFile };