const express = require('express');
const userRouter = express.Router();
const { signup, login , update , remove , show , generateOTP , forgetPassword } = require('../controller/userController.js');
const { signupValidate, loginValidate , userUpdateValidate , generateOTPValidate , forgetPasswordValidate } = require('../validation/userJoiValidation.js');
const { userValidation }= require('../validation/userAuthentication.js');


userRouter.route('/signup').post(  signupValidate , signup);
userRouter.route('/login').post(  loginValidate,login );
userRouter.route('/update').patch( userValidation, userUpdateValidate,update );
userRouter.route('/remove').delete( userValidation,remove);
userRouter.route('/show').get( userValidation, show);
userRouter.route('/generateOTP').get(generateOTPValidate , generateOTP);
userRouter.route('/forgetPassword').patch(forgetPasswordValidate , forgetPassword);


module.exports = userRouter ;  