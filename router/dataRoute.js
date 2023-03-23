const express = require('express');
const dataRouter = express.Router();

/* import the files */
const { upload } = require('../middleware/multer.js');
/* Controllers import files */
const { addData , showDataAll , deleteData ,showData, updateData } = require('../controller/dataController.js');
/* joiValidation import files */
 const {addDataSchema, showDataSchema, updateDataSchema, deleteDataValidate} = require('../validation/dataJoiValidation.js');
const { validate } = require('../middleware/validate.js');
const { userValidation } = require('../middleware/userAuthentication.js');



 /* dataroute for all routes  */
dataRouter.use("/public", express.static('./public'));
dataRouter.route('/addData').post(upload.single('image') , userValidation , validate(addDataSchema), addData);
dataRouter.route('/showDataAll').get(showDataAll);
dataRouter.route('/showData').get(userValidation , validate(showDataSchema), showData);
dataRouter.route('/deleteData').delete(userValidation , deleteDataValidate, deleteData);
dataRouter.route('/updateData').put(upload.single('image') ,userValidation , validate(updateDataSchema),updateData);

/* exports the files */
module.exports = dataRouter ; 