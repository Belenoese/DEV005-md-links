const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { existsPath, absolutePath, readDirectory, readTotalMd, validateLinks, generateStats  } = require('./functions.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (existsPath(path)) {
      const absPath = absolutePath(path);
      const mdFiles = readDirectory(absPath);

      readTotalMd(mdFiles)
        .then((links) => {
          if (options.validate) {
             validateLinks(links)
              .then((validatedLinks) => {
                resolve(validatedLinks);
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            resolve(links);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      resolve('La ruta no existe o no contiene archivos .md');
    }
  });
};

module.exports = {
  mdLinks,
  generateStats
};