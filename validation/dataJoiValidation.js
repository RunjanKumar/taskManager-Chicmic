const joi = require("joi");

/* creating Schema for addData and validate */
const addDataSchema = joi.object({
    title: joi.string().min(1).max(50).required(),
    description: joi.string().min(1).max(500).required(),
    image: joi.string().min(1).max(5),
    category : joi.string().valid("work" , "grocery" , "workout" , "hobby" , "other").required(),
    status : joi.string().valid("active" ,"inactive" ,"onhold"),
    startTime: joi.date().required(),
    endTime: joi.date().required(),
});
const addDataValidate = ( req , res ,next) => {
  console.log(req.body);
  const result = addDataSchema.validate(req.body);
  if(result.error) res.status(404).json( { statusCode : 404 , msg : result.error.message});
  else next();
};


  /* creating Schema for updateData and validate */
const updateDataSchema = joi.object({
    postId : joi.string().min(24).max(24).required(),
    title: joi.string().min(1).max(50),
    description: joi.string().min(1).max(500),
    image: joi.string().min(1).max(5),
    category : joi.string().valid("work" , "grocery" , "workout" , "hobby" , "other"),
    status : joi.string().valid("active" ,"inactive" ,"onhold"),
    startTime: joi.date(),
    endTime: joi.date(),
  }).min(2);
  const updateDataValidate = ( req , res ,next) => {
    const result = updateDataSchema.validate(req.body);
    if(result.error) res.status(404).json( { statusCode : 404 , msg : result.error.message});
    else next();
  };

  /* creating Schema for deleteData and validate */
const deleteDataSchema = joi.object({
  _id : joi.string().min(24).max(24).required(),
});
const deleteDataValidate = ( req , res ,next) => {
  const result = deleteDataSchema.validate(req.body);
  if(result.error) res.status(404).json( { statusCode : 404 , msg : result.error.message});
  else next();
};



module.exports = {
  addDataSchema,
  updateDataSchema,
  deleteDataSchema,
  addDataValidate,
  deleteDataValidate,
  updateDataValidate,
};
