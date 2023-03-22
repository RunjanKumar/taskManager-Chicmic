const express = require('express');
const userRouter = express.Router();

/* import the files */
const { signup, login , update , remove , show , generateOTP , forgetPassword } = require('../controller/userController.js');
const { signupValidate, loginValidate , userUpdateValidate , generateOTPValidate , forgetPasswordValidate } = require('../validation/userJoiValidation.js');
const { userValidation }= require('../validation/userAuthentication.js');

/* router for all server */
userRouter.route('/signup').post(  signupValidate , signup);
userRouter.route('/login').post(  loginValidate,login );
userRouter.route('/update').patch( userValidation, userUpdateValidate,update );
userRouter.route('/remove').delete( userValidation,remove);
userRouter.route('/show').get( userValidation, show);
userRouter.route('/generateOTP').get(generateOTPValidate , generateOTP);
userRouter.route('/forgetPassword').patch(forgetPasswordValidate , forgetPassword);

/* exports the file */
module.exports = userRouter ;  