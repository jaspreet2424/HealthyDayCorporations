const http = require("node:http");
const { handleGraphQLRequest } = require("./graphql/graphql");
const { servingStaticFiles } = require("./Routes/StaticFiles");
const { databaseConnection } = require("./utils/database");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const PATHNAME = process.env.PATHNAME || 'localhost';

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET , POST , DELETE , PUT , OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type , Authorization",
  "Access-Control-Max-Age": 2592000, //30 days
};

databaseConnection();

const server = http.createServer((req, res) => {
  const { url, method } = req;
  let body = "";

  if (method === "OPTIONS") {
    //This is the Header for PreFlight Request
    res.writeHead(204, headers);
    return res.end();
  }

  if (url === "/graphql") {
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      handleGraphQLRequest(req, res, headers, body);
    });
  } else {
    servingStaticFiles(req, res);
  }
});

server.listen(8000, () => {
  console.log(
    `Backend Server is Running at port http://${PATHNAME}:${
      PORT
    }/`
  );
});
