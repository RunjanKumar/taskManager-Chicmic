const multer = require("multer");
const path = require('path');


/* storage engine */
const storage = multer.diskStorage({
  destination: "./public/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


const upload = multer({ 
   storage: storage,
   limits: { fileSize: 2000000 } ,
   fileFilter : function(req , file , cb){
          const fileTypes = /jpeg|jpg|png/;
          const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
          const mimeType = fileTypes.test(file.mimetype);
          if( extname && mimeType){
              return cb(null,true);
          }else{
              return req.res.status(403).json({ statusCode : 403 ,Error : "jpg and png only allowed"});
          }
      }});
 
module.exports = { upload };
