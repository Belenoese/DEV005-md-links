const fs = require("fs");
const path = require("path");
const axios = require("axios");

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
    // console.log("Ruta absoluta", route);
    return route;
  } else {
    // console.log("Ruta relativa convertida en absoluta", path.resolve(route));
    return path.resolve(route);
  }
};
absolutePath("carpeta-prueba/sub-carpeta");

// read directory and return array of md files

const readDirectory = (directory) => {
  const mds = [];
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    // linking routes to make them absolute
    const absolutePath = path.join(directory, file);
    const stats = fs.statSync(absolutePath);
    if (stats.isDirectory()) {
      mds.push(...readDirectory(absolutePath));
    } else {
      // check if the file extension is .md
      if (path.extname(file) === ".md") {
        mds.push(absolutePath);
      }
      // console.log('archivo no cuenta con extensión .md:', absolutePath);
    }
  });

  return mds;
};

// console.log(
//   readDirectory2(
//     "C:/Users/belen/Desktop/Laboratoria/DEV005-md-links/carpeta-prueba"
//   ),
//   111
// );I

readOneMd = (md) => {
  return new Promise((resolve, reject) => {
    let links = [];
    fs.readFile(md, "utf8", (error, data) => {
      if (error) {
        reject(error);
      } else {
        const linkMatcher = /\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        while ((match = linkMatcher.exec(data))) {
          const text = match[1];
          const url = match[2];
          links.push({ href: url, text, file: md });
        }
      }
      resolve(links);
    });
  });
};

// readOneMd(
//   "C:\\Users\\belen\\Desktop\\Laboratoria\\DEV005-md-links\\carpeta-prueba\\archivoMdConLink.md"
// )
//   .then((res) => console.log(res, 137))
//   .catch((err) => console.log(err.message), 138);

const readTotalMd = (arrayMd) => {
  const promises = [];

  arrayMd.forEach((element) => {
    promises.push(readOneMd(element));
  });

  return Promise.all(promises)
    .then((results) => {
      const links = results.flat();
      // console.log(links);
      return links;
    })
    .catch((error) => {
      throw error;
    });
};

const directoryPath = readDirectory(
  "C:/Users/belen/Desktop/Laboratoria/DEV005-md-links/carpeta-prueba"
);
readTotalMd(directoryPath);

// route validation with axios

const validationLink = (link, validate) => {
  if (validate) {
    return axios
      .head(link.href)
      .then((response) => {
        link.status = response.status;
        link.ok =
          response.status >= 200 && response.status < 400 ? "OK" : "FAIL";
        return link;
      })
      .catch((error) => {
        link.status = 0;
        link.ok = "fail";
        return link;
      });
  } else {
    link.status = null;
    link.ok = null;
    return Promise.resolve(link);
  }
};

// Link validation function
const validateTotalMd = (arrayMd, validate) => {
  return readTotalMd(arrayMd)
    .then((links) => {
      const linkPromises = links.map((link) => {
        return validationLink(link, validate);
      });
      return Promise.all(linkPromises);
    })
    .catch((error) => {
      throw error;
    });
};

// validateTotalMd(["carpeta-prueba/archivoMdConLink.md"], true).then(
//   (validatedLinks) => {
//     console.log(validatedLinks);
//     return validatedLinks;
//   }
// );

// Unique links

const countUniqueLinks = (setOfValidLinks) => {
  const uniqueLinks = new Set();

  setOfValidLinks.forEach((link) => {
    uniqueLinks.add(link.href);
  });
  return uniqueLinks.size;
};

// Broken links

const brokenLinks = (setOfValidLinks) => {
  let brokenCount = 0;

  setOfValidLinks.forEach((link) => {
    if (link.ok === "fail") {
      brokenCount++;
    }
  });
  return brokenCount;
};

// Options Stats

const generateStats = (setOfValidLinks) => {
  const stats = {
    total: setOfValidLinks.length,
    unique: countUniqueLinks(setOfValidLinks),
    broken: brokenLinks(setOfValidLinks),
  };
  return stats;
};

const setOfValidLinks = [
  {
    href: 'https://github.com/Laboratoria/DEV005-md-links',
    text: 'link de prueba',
    file: 'carpeta-prueba/archivoMdConLink.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://nodejs.org/api/fs.html',
    text: 'link de prueba',
    file: 'carpeta-prueba/archivoMdConLink.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://nodejs.org/api/fs.html/invalido',
    text: 'link de prueba',
    file: 'carpeta-prueba/archivoMdConLink.md',
    status: 0,
    ok: 'fail'
  }
]

const stats = generateStats(setOfValidLinks)
console.log(stats);


module.exports = {
  existsPath,
  absolutePath,
  readDirectory,
  readTotalMd,
  validateTotalMd,
};
