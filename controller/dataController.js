const { secretKey } = require("../utils/common.js");
const jwt = require("jsonwebtoken");

const {  taskManager } = require('../model/mongoSchema.js');
/* @desc api for addData
@route POST  /addData
@access Public */
const addData = async (req, res) => {
    const result = jwt.verify(req.headers.token, secretKey);
    const bodyData = req.body;
    if(req.file){
       bodyData.image = req.file.path;
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
    if(userData) return res.json(userData);
    else return res.json({msg : "you have  no post"});
    
  } catch (err) {
    return res.json(err.message);
  }
}; 

    /* @desc api for deleteData
@route GET  /deleteData
@access Public */
const deleteData = async (req, res) => {  
  try {
    let _id =req.headers._id;
      let userData = await taskManager.findOneAndDelete({_id : _id});
      if(!userData){
        return res.status(400).json({msg : "please provide a valid postid"});
      }else{
        return res.status(200).json({msg : "delete successfully"});
      }
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
      if(req.file){
        req.body.Image = req.file.path;
     }
      let userData = await taskManager.findOneAndUpdate({_id : id} , { $set : req.body } , {new : true} );
      return res.json(userData);
    }catch (err) {
      return res.json(err.message);
    } 
};


module.exports = { addData , showDataAll , showData ,deleteData , updateData} ;
