const { default: expect } = require('expect');
const { mdLinks } = require('../index.js');
const { absolutePath, existsPath, validateLinks } = require('../functions.js');
const axios = require('axios');

jest.mock('axios');

describe('validateLink', () => {
  it('validateLinks debería retornar un objeto con las propiedades status y ok', () => {
    const link = { href: 'https://example.com' };
    const response = { status: 200 };

    axios.head.mockResolvedValueOnce(response);

    return validateLinks([link])
      .then(result => {
        expect(result).toEqual([{
          href: 'https://example.com',
          status: 200,
          ok: 'ok'
        }]);
      });
    });
  });


describe('mdLinks', () => {

  it('mdLinks debría ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Debería devolver una promesa', () => {
   expect(mdLinks('mdLinks.md')).toBeInstanceOf(Promise);
  });
  it('Debe mostrar un mensaje si el path no existe o no contiene archivos .md', () => {
    const path = '/carpeta-prueba/archivo-pruebassss.txt'
    expect(mdLinks(path)).resolves.toEqual('La ruta no existe o no contiene archivos .md');
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
