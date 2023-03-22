const express = require('express');
const dataRouter = express.Router();

/* import the files */
const { upload } = require('../validation/multer.js');
const { addData , showDataAll , deleteData ,showData, updateData } = require('../controller/dataController.js');
 const {  addDataValidate, deleteDataValidate, showDataValidate , updateDataValidate } = require('../validation/dataJoiValidation');


 /* dataroute for all routes  */
dataRouter.route('/addData').post(upload.single('images') , addDataValidate, addData);
dataRouter.route('/showDataAll').get(showDataAll);
dataRouter.route('/showData').get(showDataValidate,showData);
dataRouter.route('/deleteData').delete(deleteDataValidate,deleteData);
dataRouter.route('/updateData').put(updateDataValidate,updateData);

/* exports the files */
module.exports = dataRouter ; 
