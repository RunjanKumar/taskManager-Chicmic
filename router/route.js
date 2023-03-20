const express = require('express');
const router = express.Router();
const { signup , login ,addData , showData , deleteData , updateData } = require('../controller/controller.js');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/addData').post(addData);
router.route('/showData').get(showData);
router.route('/deleteData').delete(deleteData);
router.route('/updateData').put(updateData);

module.exports = router ;
