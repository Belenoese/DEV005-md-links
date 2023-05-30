const { default: expect } = require('expect');
const { mdLinks } = require('../index.js');
const { absolutePath, existsPath, readDirectory } = require('../functions.js');


describe('mdLinks', () => {

  it('mdLinks debría ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Debería devolver una promesa', () => {
   expect(mdLinks('mdLinks.md')).toBeInstanceOf(Promise);
  });
  it('Debe rechazar la promesa cuando el path no existe', () => {
    const path = '/carpeta-prueba/archivo-pruebassss.txt'
    expect(mdLinks(path)).rejects.toThrowError('La ruta no existe');
  });
  it('Debería devolver true si la ruta existe', () => {
    const path = 'C:/Users/belen/Desktop/Laboratoria/DEV005-md-links/carpeta-prueba';
    const result = existsPath(path);
    expect(result).toBe(true);
  });
  it('Debería devolver false si la ruta no existe', () => {
    const path = 'ruta/inexistente';
    const result = existsPath(path);
    expect(result).toBe(false);
  });
  it('Debe convertir la ruta cuando sea relativa', () => {
    const relativePath = 'carpeta-prueba'
    expect(absolutePath(relativePath)).toEqual('C:\\Users\\belen\\Desktop\\Laboratoria\\DEV005-md-links\\carpeta-prueba');
  });
});
