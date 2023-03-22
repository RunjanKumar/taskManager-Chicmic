const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils/common.js");
const { User} = require('./mongoSchema.js');

const userValidation = async (req, res, next) => {
  try {
    if (!req.headers.token) {
      return res.status(401).send({ msg : "please provide a valid token"});
    }
    const result = jwt.verify(req.headers.token, secretKey);
    let check = await User.findOne({_id : result.id});
    if(!check){
        return res.status(401).send({ mes : "you are not a valid user" });
  }
  next();
  }catch (err) {
    return res.status(401).send({ msg : "your token is expired" });
  }
  
};

module.exports = { userValidation };
