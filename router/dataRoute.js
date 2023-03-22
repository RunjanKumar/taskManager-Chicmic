const express = require('express');
const dataRouter = express.Router();
const { upload } = require('../validation/multer.js');
const { addData , showData , deleteData , updateData } = require('../controller/dataController.js');
 const {  addDataValidate, deleteDataValidate, updateDataValidate } = require('../validation/dataJoiValidation');

dataRouter.route('/addData').post(upload.single('images') , addDataValidate, addData);
dataRouter.route('/showData').get(showData);
dataRouter.route('/deleteData').delete(deleteDataValidate,deleteData);
dataRouter.route('/updateData').put(updateDataValidate,updateData);


module.exports = dataRouter ; 
