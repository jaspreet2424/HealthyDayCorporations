const path = require("path");
const fs = require("fs");

const servingHTMLFiles = (req, res, pathname) => {
  let filePath = "";

  switch (pathname) {
    case "/":
      filePath = path.join(__dirname, "../views/users", "home.html");
      break;

    case "/menu":
      filePath = path.join(__dirname, "../views/users", "menu.html");
      break;

    case "/sign_in":
      filePath = path.join(__dirname, "../views/users", "login.html");
      break;

    case "/sign_up":
      filePath = path.join(__dirname, "../views/users", "register.html");
      break;
  }

  fs.readFile(filePath, "utf-8", (err, fileData) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Page not found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fileData);
    }
  });
};

module.exports = {
  servingHTMLFiles,
};
