const path = require("path");
const fs = require("fs");

const servingCSSFiles = (req, res, pathname) => {
  let filePath = "";

  switch (pathname) {
    case "/public/CSS/home.css":
      filePath = path.join(__dirname, "../public/CSS", "home.css");
      break;

    case "/public/CSS/navbar.css":
      filePath = path.join(__dirname, "../public/CSS", "navbar.css");
      break;

    case "/public/CSS/common.css":
      filePath = path.join(__dirname, "../public/CSS", "common.css");
      break;

    case "/public/CSS/menu.css":
      filePath = path.join(__dirname, "../public/CSS", "menu.css");
      break;

    case "/public/CSS/login.css":
      filePath = path.join(__dirname, "../public/CSS", "login.css");
      break;

    case "/public/CSS/register.css":
      filePath = path.join(__dirname, "../public/CSS", "register.css");
      break;

    case "/public/CSS/cart.css":
      filePath = path.join(__dirname, "../public/CSS", "cart.css");
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
  servingCSSFiles,
};
