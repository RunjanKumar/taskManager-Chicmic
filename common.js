const { pbkdf2Sync } = require('crypto');
const secretKey = process.env.SECRET_KEY;
const hashPassword = (str) => {
    return pbkdf2Sync(str , 'salt' , 100000, 64 , 'sha512').toString('hex');
};

module.exports = { hashPassword , secretKey };
