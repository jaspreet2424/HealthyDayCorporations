const path = require("path");
const fs = require("fs");

const servingResponsiveCSSFiles = (req, res, pathname) => {
  let filepath = "";

  switch (pathname) {
    case "/public/Responsive/ResponsiveNavbar.css":
      filepath = path.join(
        __dirname,
        "../public/Responsive/",
        "ResponsiveNavbar.css"
      );
      break;

    case "/public/Responsive/ResponsiveMenu.css":
      filepath = path.join(
        __dirname,
        "../public/Responsive/",
        "ResponsiveMenu.css"
      );
      break;

    case "/public/Responsive/ResponsiveCart.css":
      filepath = path.join(
        __dirname,
        "../public/Responsive",
        "ResponsiveCart.css"
      );
      break;

    case "/public/Responsive/ResponsiveLogin.css":
      filepath = path.join(
        __dirname,
        "../public/Responsive",
        "ResponsiveLogin.css"
      );
      break;

    case "/public/Responsive/ResponsiveHome.css":
      filepath = path.join(
        __dirname,
        "../public/Responsive",
        "ResponsiveHome.css"
      );
      break;
  }

  fs.readFile(filepath, "utf-8", (err, fileData) => {
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
  servingResponsiveCSSFiles,
};
