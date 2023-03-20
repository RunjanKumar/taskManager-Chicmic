const jwt = require("jsonwebtoken");
const { secretKey } = require("../common");
const { User} = require('./schema.js');

const userValidation = (req, res, next) => {
  if (req.url === "/signup" || req.url === "/login") {
    next();
    return;
  }
  if (!req.headers.token) {
    return res.status(401).send("please provide a valid token");
  }
  try {
    ({ id } = jwt.verify(req.headers.token, secretKey));
  } catch (err) {
    return res.status(401).send("your token is expired");
  }
  let check = User.find({email : id});
  if(check.length === 0){
    return res.status(401).send("please provide a valid token");
  }
  next();
};

module.exports = { userValidation };
