const { hashPassword, secretKey } = require("../common.js");
const jwt = require("jsonwebtoken");
const {
    signupSchema,
    loginSchema,
    updateSchema,
    schemaValidate,
    deleteSchema,
    addDataSchema,
    User,
    taskManager,
  } = require("../validation/schema.js");


/* @desc api for signup
@route POST /signup
@access Public */
const signup = async (req, res) => {
  try {
    schemaValidate(signupSchema, req.body);
  } catch (err) {
    return res.send(err.message);
  }
  req.body.email = req.body.email.toLowerCase();
  req.body.password = hashPassword(req.body.password);
  const bodyData = req.body;
  let token = jwt.sign({ id: bodyData.email }, secretKey);
  bodyData.token = token;
  try {
    await User.create(bodyData);
    return res.send("successfull signup");
  } catch (err) {
    return res.send(err.message);
  }
};

/* @desc api for login
@route POST  /login
@access Public */
const login = async (req, res) => {
  try {
    schemaValidate(loginSchema, req.body);
  } catch (err) {
    return res.send(err.message);
  }
  const bodyData = req.body;
  /* checking Email */
  let check = await User.find({ email: bodyData.email });
  if (check.length === 0) {
    return res.status(401).send("please provide a valid email");
  }
  if(hashPassword(bodyData.password) !== check[0].password){
    return res.send("please provide a correct Password");
  }
  let newToken = jwt.sign({id : bodyData.email} , secretKey);
  await User.findOneAndUpdate({ email: bodyData.email } , {$set : {token : newToken}}  , {new: true});
  return res.send("successfull login");
};

/* @desc api for addData
@route POST  /addData
@access Public */
const addData = async (req, res) => {
    try {
        schemaValidate(addDataSchema, req.body);
      } catch (err) {
        return res.send(err.message);
      }
      ({ id } = jwt.verify(req.headers.token, secretKey));
    const bodyData = req.body;
    bodyData.email = id;
    try {
        await taskManager.create(bodyData);
        return res.send("successfull addData");
      } catch (err) {
        return res.send(err.message);
      }
  };

  /* @desc api for showData
@route GET  /showData
@access Public */
const showData = async (req, res) => {
      ({ id } = jwt.verify(req.headers.token, secretKey));
    try {
        let userData = await taskManager.find({email : id});
        return res.json(userData);
      } catch (err) {
        return res.send(err.message);
      }
  };

    /* @desc api for deleteData
@route GET  /deleteData
@access Public */
const deleteData = async (req, res) => {
    try {
        schemaValidate(deleteSchema, req.body);
      } catch (err) {
        return res.send(err.message);
      }
      
  try {
      let userData = await taskManager.deleteOne({_id : req.body._id});
      return res.json(userData);
    } catch (err) {
      return res.send(err.message);
    }
};
    /* @desc api for updateData
@route GET  /updateData
@access Public */
const updateData = async (req, res) => {
    try {
        schemaValidate(updateSchema, req.body);
      } catch (err) {
        return res.send(err.message);
      }
  try {
    console.log(await taskManager.find({_id : req.body._id}));
      let userData = await taskManager.updateOne({_id : req.body._id} , { $set : {title : req.body.title , detail : req.body.detail , attachment : req.body.attachment }});
      return res.json(userData);
    } catch (err) {
      return res.send(err.message);
    }
    
};
module.exports = { signup, login ,addData ,showData , deleteData , updateData} ;
