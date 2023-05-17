// module.exports = () => {
//   // ...
// };

const fs = require('fs');
 
fs.readFile('C:/Users/belen/Desktop/Laboratoria/DEV005-md-links/archivo-prueba.txt', 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
  
    console.log(data);
  });

