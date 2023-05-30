const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { existsPath, absolutePath, readDirectory, readTotalMd, validateTotalMd  } = require('./functions.js');



const mdLinks = (path, options) => {
  return new Promise((resolve, reject)=> {
    // Identify if a route exists otherwise reject the pledge
    if (existsPath(path)) {
    // Identify if the path is relative in order to convert it into an absolute path
    const absPath = (absolutePath(path)) 

    const mdFiles = readDirectory(absPath);
    readTotalMd(mdFiles)
      .then((links) => {
        if (options.validate) {
          return validateTotalMd(links, true);
        } else {
          resolve(links);
        }
      })
      .then((validatedLinks) => {
        resolve(validatedLinks);
      })
      .catch((error) => {
        reject(error);
      });
  }});
};

module.exports = {
  mdLinks
};