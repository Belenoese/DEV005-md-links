const fs = require("fs");
const path = require("path");
const axios = require("axios");

// seeing if the route exists
const existsPath = (route) => {
  if (fs.existsSync(route)) {
    return true;
  } else {
    return false;
  }
};

// Verifying if the path is absolute, if not, we convert the relative path into absolute
const absolutePath = (route) => {
  if (path.isAbsolute(route)) {
    return route;
  } else {
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
    }
  });

  return mds;
};

// Reading md file
const readOneMd = (md) => {
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

// reading all md file
const readTotalMd = (arrayMd) => {
  const promises = [];

  arrayMd.forEach((element) => {
    promises.push(readOneMd(element));
  });

  return Promise.all(promises)
    .then((results) => {
      const links = results.flat();
      return links;
    })
    .catch((error) => {
      throw error;
    });
};

// route validation with axios
const validateLinks = (links) => {
  const linkPromises = links.map((link) => {
    return axios.get(link.href)
      .then((response) => {
        link.status = response.status;
        link.ok = response.status >= 200 && response.status < 400 ? "ok" : "fail";
        return link;
      })
      .catch(() => {
        link.status = 0;
        link.ok = "fail";
        return link;
      });
  });

  return Promise.all(linkPromises);
};


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


module.exports = {
  existsPath,
  absolutePath,
  readDirectory,
  readTotalMd,
  generateStats,
  validateLinks,
};
