const path = require("path");
const fs = require("fs");

const servingScriptingFiles = (req, res, pathname) => {
  let filePath = "";

  switch (pathname) {
    case "/public/Scripts/cart.js":
      filePath = path.join(__dirname, "../public/Scripts", "cart.js");
      break;

    case "/public/Scripts/home.js":
      filePath = path.join(__dirname, "../public/Scripts", "home.js");
      break;

    case "/public/Scripts/login.js":
      filePath = path.join(__dirname, "../public/Scripts", "login.js");
      break;

    case "/public/Scripts/navbar.js":
      filePath = path.join(__dirname, "../public/Scripts", "navbar.js");
      break;

    case "/public/Scripts/register.js":
      filePath = path.join(__dirname, "../public/Scripts", "register.js");
      break;
  }

  fs.readFile(filePath, "utf-8", (err, fileData) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Page not found");
    } else {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(fileData);
    }
  });
};

module.exports = {
  servingScriptingFiles,
};
