const joi = require("joi");


/* creating Schema for addData and validate */
const addDataSchema = joi.object({
    title: joi.string().min(1).max(50).required(),
    description: joi.string().min(1).max(500).required(),
    image: joi.string(),
    category : joi.string().valid("work" , "grocery" , "workout" , "hobby" , "other").required(),
    status : joi.string().valid("active" ,"inactive" ,"onhold"),
    startTime: joi.date().required(),
    endTime: joi.date().required(),
});



  /* creating Schema for updateData and validate */
const updateDataSchema = joi.object({
    postId : joi.string().hex().length(24).required(),
    title: joi.string().max(50),
    description: joi.string().max(500),
    image: joi.string(),
    category : joi.string().valid("work" , "grocery" , "workout" , "hobby" , "other"),
    status : joi.string().valid("active" ,"inactive" ,"onhold"),
    startTime: joi.date(),
    endTime: joi.date(),
  });


  /* creating Schema for deleteData and validate */
const deleteDataSchema = joi.object({
   _id : joi.string().min(24).max(24).required(),
}).unknown(true);
const deleteDataValidate = (req , res , next) => {
    const result = deleteDataSchema.validate(req.headers);
    if(result.error) return res.status(400).json({error : result.error.message});
    next();
};


/* creating Schema for showData and validate */
const showDataSchema = joi.object({
    _id : joi.string().min(24).max(24).required(),
  });




module.exports = {
  addDataSchema,
  showDataSchema,
  deleteDataSchema,
  updateDataSchema,
  deleteDataValidate
};
