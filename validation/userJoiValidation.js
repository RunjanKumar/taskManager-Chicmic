const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const passwordOptions = {
  min: 8,
  max: 50,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: Infinity,
};
const phoneOptions = {
  min: 10,
  max: 10,
  lowerCase: 0,
  upperCase: 0,
  numeric: 10,
  symbol: 0,
  requirementCount: Infinity,
};

/* creating Schema for signup  and validate */
const signupSchema = joi.object({
  name: joi.string().min(4).max(30).required(),
  email: joi.string().email({ tlds: { allow: ["com", "in"] }}).required().lowercase(),
  password: passwordComplexity(passwordOptions).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required(),
  phoneNumber: passwordComplexity(phoneOptions).required(),
});

const signupValidate = ( req , res ,next) => {
  const result = signupSchema.validate(req.body);
  if(result.error) res.send( { statusCode : 404 , msg : result.error.message});
  else { 
    req.body = result.value; 
    next();
   }
};

/* creating Schema for login and validate */
const loginSchema = joi.object({
  email: joi.string().email({ tlds: { allow: ["com", "in"] } }).required().lowercase(),
  password: passwordComplexity(passwordOptions).required(),
});
const loginValidate = ( req , res ,next) => {
  const result = loginSchema.validate(req.body);
  if(result.error) res.send( { statusCode : 404 , msg : result.error.message});
  else {
    req.body = result.value;
    next();
  }
};

/* creating Schema for userUpdate and validate */
const userUpdateSchema = joi.object({
  name: joi.string().min(4).max(30), 
  phoneNumber: passwordComplexity(phoneOptions),
  password: passwordComplexity(passwordOptions),
}).min(1);

const userUpdateValidate = ( req , res ,next) => {
  const result = userUpdateSchema.validate(req.body);
  if(result.error) {
    res.status(404).send( { statusCode : 404 , msg : result.error.message});
  }
  else {
    next();
  }
};

const generateOTPSchema = joi.object({
  email : joi.string().required(),
});
const generateOTPValidate = (req , res, next) => {
  const result = generateOTPSchema.validate(req.body);
  if(result.error) {
    res.status(404).send( { statusCode : 404 , msg : result.error.message});
  }else{
    next() ;
  }
};

const forgetPasswordSchema = joi.object({
  OTP : joi.number().min(0).required(),
  password : passwordComplexity(passwordOptions).required(),
  email : joi.string().required(),
});
const forgetPasswordValidate = (req , res , next) => {
  const result = forgetPasswordSchema.validate(req.body);
  if(result.error) {
    res.status(404).send( { statusCode : 404 , msg : result.error.message});
  }else{
    next() ;
  }
};

module.exports = {
    signupValidate,
    loginValidate,
    userUpdateValidate,
    generateOTPValidate,
    forgetPasswordValidate
  };