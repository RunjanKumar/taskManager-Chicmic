const { secretKey } = require("../utils/common.js");
const jwt = require("jsonwebtoken");

const {  taskManager } = require('../validation/mongoSchema.js');
/* @desc api for addData
@route POST  /addData
@access Public */
const addData = async (req, res) => {
    const result = jwt.verify(req.headers.token, secretKey);
    const bodyData = req.body;
    if(req.file){
       bodyData.Image = req.file.path;
    }
    bodyData.userID= result.id;
    try {
        await taskManager.create(bodyData);
        return res.json({ "msg": "successfully addData" });
      } catch (err) {
        return res.status(400).json(err.message);
      }
  };

  /* @desc api for showDataAll
@route GET  /showDataAll
@access Public */
const showDataAll = async (req, res) => {    
      const result  = jwt.verify(req.headers.token, secretKey);
    try {
        let userData = await taskManager.find({userID : result.id});
        return res.json(userData);
      } catch (err) {
        return res.json(err.message);
      }
  }; 

  /* @desc api for showData
@route GET  /showData
@access Public */
const showData = async (req, res) => {    
  try {
    let userData = await taskManager.findOne({_id : req.body._id});
    return res.json(userData);
  } catch (err) {
    return res.json(err.message);
  }
}; 

    /* @desc api for deleteData
@route GET  /deleteData
@access Public */
const deleteData = async (req, res) => {  
  try {
      let userData = await taskManager.deleteOne({_id : req.body._id});
      return res.json(userData);
    } catch (err) {
      return res.json(err.message);
    }
};
    /* @desc api for updateData
@route GET  /updateData
@access Public */
const updateData = async (req, res) => {
  try {
      let id = req.body.postId;
      delete req.body.id;
      let check = await taskManager.findOne({_id : id});
      if(!check){
        return res.json({msg : "postid is invalid"});
      }
      let userData = await taskManager.findOneAndUpdate({_id : id} , { $set : req.body } , {new : true} );
      return res.json(userData);
    }catch (err) {
      return res.json(err.message);
    } 
};


module.exports = { addData , showDataAll , showData ,deleteData , updateData} ;
