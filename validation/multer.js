const multer = require("multer");
const path = require('path');


/* storage engine */
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


const upload = multer({ storage: storage, limits: { fileSize: 100000 } });
module.exports = { upload };
