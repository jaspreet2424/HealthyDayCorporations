const { servingCSSFiles } = require("./CSSFiles");
const { servingHTMLFiles } = require("./HTMLFiles");
const { servingResponsiveCSSFiles } = require("./ResponsiveCSSFiles");
const { servingScriptingFiles } = require("./ScriptingFiles");

const servingStaticFiles = (req, res) => {
  const { url, headers } = req;
  const pathname = new URL(url, `http://${headers.host}`).pathname;

  if (pathname.startsWith("/public/CSS")) {
    servingCSSFiles(req, res, pathname);
  } else if (pathname.startsWith("/public/Responsive")) {
    servingResponsiveCSSFiles(req, res, pathname);
  } else if (pathname.startsWith("/public/Scripts")) {
    servingScriptingFiles(req, res, pathname);
  } else {
    servingHTMLFiles(req, res, pathname);
  }
};

module.exports = {
  servingStaticFiles,
};
