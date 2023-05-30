const { mdLinks } = require('./index.js');

mdLinks('/carpeta-prueba/archivo-prueba.txt').then(()=>{})
.catch((error) => {
    console.log(error)
});

