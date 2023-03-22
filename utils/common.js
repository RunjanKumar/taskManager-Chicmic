const { pbkdf2Sync } = require('crypto');



/* Common constants */
const secretKey = process.env.SECRET_KEY;
const notValidEmail = "please provide a valid email";
const notValidOTP = "please provide a valid OTP";







/* common Function */
const hashPassword = (str) => {
    return pbkdf2Sync(str , 'salt' , 100000, 64 , 'sha512').toString('hex');
};

module.exports = { hashPassword , secretKey  , notValidEmail , notValidOTP};
