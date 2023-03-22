const { hashPassword, secretKey , notValidEmail , notValidOTP} = require("../utils/common.js"); 
const jwt = require("jsonwebtoken");
const { User  } = require('../validation/mongoSchema.js');

/* @desc api for signup
@route POST /signup
@access Public */
const signup = async (req, res) => {
  /* checking email is duplicated or not */
  let check = await User.find({email : req.body.email});
  if(check.length){
    return res.status(400).json({ msg : "email is also registered"});
  }
  req.body.password = hashPassword(req.body.password);
  const bodyData = req.body;
  bodyData.date = Date.now();
  try {
    let user = await User.create(bodyData);
    let createToken = jwt.sign({ id: user._id.toString()}, secretKey);
    await User.findOneAndUpdate({email : bodyData.email , name : bodyData.name} ,{$set : {token : createToken}});
    return res.json({msg : "Successfully signup"});
  } catch (err) {
    return res.status(400).json({Error : err.message});
  }
};


/* @desc api for login
@route POST  /login
@access Public */
const login = async (req, res) => {
  const bodyData = req.body;
  /* checking Email */
  let check = await User.findOne({ email: bodyData.email });
  if (!check) {
    return res.status(401).json( {msg : "please provide a valid email"});
  }
  if(hashPassword(bodyData.password) !== check.password){
    return res.json({msg : "please provide a correct password"});
  }
  let createToken = jwt.sign({ id: check._id.toString()}, secretKey);
  await User.findOneAndUpdate({ email: bodyData.email , name : bodyData.name } , {$set : {token : createToken}},{new :true});
  return res.json({msg : "Successfully login" , token : createToken});
};
/* @desc api for update
@route PATCH  /update
@access Public */
const update = async (req, res) => {
    const bodyData = req.body;
    const result = jwt.verify(req.headers.token , secretKey);
    await User.findOneAndUpdate({_id : result.id} , {$set : {name : bodyData.name ,
        phoneNumber : bodyData.phoneNumber,
        password : hashPassword(bodyData.password), 
    }});
    return res.json("successfull update");
  };

  /* @desc api for delete
@route DELETE  /delete
@access Public */
const remove = async (req, res) => {
    const result = jwt.verify(req.headers.token , secretKey);
    await User.findOneAndDelete({_id : result.id});
    return res.json("successfull delete");
  };

   /* @desc api for show
@route GET  /show
@access Public */
const show = async (req, res) => {
    const result = jwt.verify(req.headers.token , secretKey);
    let user = await User.findOne({_id : result.id});
    return res.json(user);
  };

     /* @desc api for generateOTP
@route GET  /generateOTP
@access Public */

const generateOTP = async (req , res) => {
    let check = await User.findOne({email : req.body.email});
    if(!check){
      return res.json({ msg : notValidEmail });
    }
    const OTP = Math.trunc(Math.random() *1000000);
    await User.findOneAndUpdate({email : req.body.email}, {$set : {OTP}});
    return res.json({ OTP : OTP });
};

/*  @desc apPOSTor forgetPassword
@route POST  /forgetPassword
@access Public */
const forgetPassword = async (req ,res ) => {
    let check = await User.findOne({email : req.body.email});
    if(!check){
      return res.json({ msg : notValidEmail });
    }
    check = await User.findOne({email : req.body.email , OTP : req.body.OTP} );
    if(!check){
      return res.json({ msg : notValidOTP });
    }
    await User.findOneAndUpdate({email : req.body.email}, {$set : {password : hashPassword(req.body.password)}});
    await User.findOneAndUpdate({email : req.body.email}, {$set : {OTP : -10}});
    res.json({msg  : "update password"});
};


module.exports = { signup , login , update , remove , show , generateOTP ,forgetPassword };