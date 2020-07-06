const express = require("express");
var cors = require("cors");
require("dotenv").config();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkScope = require("express-jwt-authz");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cash: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://react-with-auth.au.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:3001",
  issuer: "https://react-with-auth.au.auth0.com/",
  algorithms: ["RS256"],
});

const app = express();
app.use(cors());

app.get("/public", function (req, res) {
  res.json({
    message: "Hello from a public API!",
  });
});

app.get("/private", checkJwt, function (req, res) {
  res.json({
    message: "Hello from a private API!",
  });
});

app.get("/course", checkJwt, checkScope(["read:courses"]), function (req, res) {
  res.json({
    courses: [
      { id: 1, title: "abc1" },
      { id: 2, title: "abc2" },
    ],
  });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE);
