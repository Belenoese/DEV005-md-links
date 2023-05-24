const { error } = require('console');
const fs = require('fs');
const path = require('path');

 
// seeing if the route exists
const existsPath = (route) => {
  if (fs.existsSync(route)) {
    // console.log('La ruta existe.');
    return true;
  } else {
    // console.log('La ruta no existe.');
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
      // check if the file extension is .md
     if (path.extname(file) === '.md') {
       fs.readFile(absolutePath, 'utf8', (error, data) => {
        if (error) {
          console.error('No se puede leer el archivo');
        } else {
          const links = [];
          const linkMatcher = /\[([^\]]+)\]\(([^)]+)\)/g;
          let match;
          while ((match = linkMatcher.exec(data))) {
            const text = match[1];
            const url = match[2];
            links.push({ href: url, text, file: absolutePath });
          }
           console.log(`Enlaces encontrados en ${absolutePath}:`, links);
        }
      });
    } else {
       console.log('archivo no cuenta con extensión .md:', absolutePath);
    }
  }
  });
} catch (error) {
   console.error('Error al leer el directorio');
}
};
 readDirectory('C:/Users/belen/Desktop/Laboratoria/DEV005-md-links/carpeta-prueba');


module.exports = { existsPath, absolutePath, readDirectory };