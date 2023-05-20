const { default: expect } = require('expect');
const { mdLinks } = require('../index.js');
// const existsPath = require('../functions.js');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  // it('Debería devolver una promesa', () => {
  //   expect(mdLinks()) .toBe(typeof(Promise));
  // });
  it('Debe rechazar la promesa cuando el path no existe', () => {
    const path = '/carpeta-prueba/archivo-pruebas.txt'
    return expect(mdLinks(path)).rejects.toEqual('La ruta no existe');
  });
});
