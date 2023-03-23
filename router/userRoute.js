const express = require('express');
const userRouter = express.Router();

/* import the files */
const { signup, login , update , remove , show , generateOTP , forgetPassword } = require('../controller/userController.js');
const {signupSchema , loginSchema , userUpdateSchema , generateOTPSchema , forgetPasswordSchema} = require('../validation/userJoiValidation');
const { userValidation }= require('../middleware/userAuthentication.js');
const { validate } = require('../middleware/validate.js');

/* router for all server */
userRouter.route('/signup').post(   validate(signupSchema) , signup);
userRouter.route('/login').post(   validate(loginSchema),login );
userRouter.route('/update').patch(userValidation , validate(userUpdateSchema),update );
userRouter.route('/remove').delete(remove);
userRouter.route('/show').get( userValidation, show);
userRouter.route('/generateOTP').get( validate(generateOTPSchema), generateOTP);
userRouter.route('/forgetPassword').patch(validate(forgetPasswordSchema) , forgetPassword);

/* exports the file */
module.exports = userRouter ;  